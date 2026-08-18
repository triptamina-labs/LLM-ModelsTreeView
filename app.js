/* Genealogía de modelos LLM — visor "genético" con Cytoscape.js */
(function () {
  "use strict";

  var DATA = window.LLM_MODELS;
  var companies = DATA.companies;
  var models = DATA.models;
  var byId = {};
  models.forEach(function (m) { byId[m.id] = m; });

  var MIN_YEAR = 2017;
  function yearOf(id) { return parseInt((byId[id].date || "2017").split("-")[0], 10) || MIN_YEAR; }
  function cColor(c) { return (companies[c] && companies[c].color) || "#888888"; }

  /* ---------- Theme ---------- */
  function readVar(name, fb) { return getComputedStyle(document.body).getPropertyValue(name).trim() || fb; }
  function textColor() { return readVar("--text", "#1d1d1f"); }
  function edgeColor() { return readVar("--muted", "#6e6e73"); }

  /* ---------- Elements ---------- */
  var nodes = models.map(function (m) {
    return {
      data: {
        id: m.id, label: m.name, company: m.company, type: m.type,
        date: m.date, year: yearOf(m.id), level: yearOf(m.id) - MIN_YEAR,
        color: cColor(m.company), params: m.params || null, note: m.note || ""
      }
    };
  });
  var edges = [];
  models.forEach(function (m) {
    (m.parents || []).forEach(function (p) {
      edges.push({ data: { id: m.id + "->" + p, source: p, target: m.id } });
    });
  });

  var cy = cytoscape({
    container: document.getElementById("cy"),
    elements: { nodes: nodes, edges: edges },
    style: [
      {
        selector: "node",
        style: {
          "background-color": "data(color)", "background-opacity": 0.16,
          "border-color": "data(color)", "border-width": 2,
          label: "data(label)", color: textColor(),
          "font-size": 10.5, "font-family": "-apple-system, 'SF Pro Text', Segoe UI, Roboto, sans-serif",
          "font-weight": 600, "text-valign": "center", "text-halign": "center",
          shape: "round-rectangle",
          width: "label", height: "label", padding: "6px",
          "overlay-opacity": 0, "overlay-padding": 6
        }
      },
      { selector: "node:selected", style: { "border-width": 3, "overlay-opacity": 0.08, "overlay-color": "#000" } },
      {
        selector: "edge",
        style: {
          width: 1.3, "line-color": edgeColor(), "target-arrow-color": edgeColor(),
          "target-arrow-shape": "triangle", "arrow-scale": 0.55,
          "curve-style": "bezier", opacity: 0.5
        }
      },
      { selector: "node.hl", style: { "background-opacity": 0.32 } }
    ],
    wheelSensitivity: 0.2,
    layout: { name: "cose", animate: false }
  });

  cy.fit(undefined, 50);

  /* ---------- Layouts ---------- */
  function runLayout(name) {
    if (name === "sectores") { applySectors(); return; }
    cy.stop();
    var opts = { animate: false, name: name };
    if (name === "concentric") {
      opts.level = function (n) { return n.data("level"); };
      opts.minNodeSpacing = 70; opts.avoidOverlap = true;
      opts.nodeDimensionsIncludeLabels = true;
    } else if (name === "cose") {
      opts.randomize = false; opts.quality = "default";
      opts.nodeRepulsion = 9000; opts.idealEdgeLength = 115;
      opts.edgeElasticity = 0.45; opts.gravity = 0.6; opts.numIter = 3000;
      opts.nodeOverlap = 25;
    }
    cy.layout(opts).run();
    cy.fit(undefined, 50);
  }

  /* Layout de sectores por familia + radio temporal (hecho a mano) */
  function applySectors() {
    var childMap = {};
    models.forEach(function (m) {
      (m.parents || []).forEach(function (p) { (childMap[p] = childMap[p] || []).push(m.id); });
    });
    var roots = models.filter(function (m) { return !m.parents || !m.parents.length; }).map(function (m) { return m.id; });
    var rootSet = {}; roots.forEach(function (r) { rootSet[r] = true; });

    function branchOf(id, memo) {
      if (memo[id] !== undefined) return memo[id];
      var m = byId[id];
      if (!m.parents || !m.parents.length) { memo[id] = "__ROOT__"; return "__ROOT__"; }
      if (m.parents.some(function (p) { return rootSet[p]; })) { memo[id] = id; return id; }
      memo[id] = branchOf(m.parents[0], memo); return memo[id];
    }

    var brCounts = {}, nb = {};
    models.forEach(function (m) {
      var b = branchOf(m.id, {}); nb[m.id] = b;
      if (b !== "__ROOT__") brCounts[b] = (brCounts[b] || 0) + 1;
    });
    var brIds = Object.keys(brCounts).sort();
    var total = brIds.reduce(function (s, b) { return s + brCounts[b]; }, 0) || 1;
    var spans = {}, start = 0;
    brIds.forEach(function (b) {
      var frac = (brCounts[b] / total) * 2 * Math.PI;
      spans[b] = { start: start, end: start + frac }; start += frac;
    });

    var seq = [];
    function preorder(n, b) {
      (childMap[n] || []).slice().sort().forEach(function (c) { if (nb[c] === b) preorder(c, b); });
      seq.push(n);
    }
    brIds.forEach(function (b) { preorder(b, b); });
    var posInSeq = {}; seq.forEach(function (id, i) { posInSeq[id] = i; });

    var yearSpacing = 95;
    var bucket = {};
    models.forEach(function (m) {
      var b = nb[m.id]; if (b === "__ROOT__") return;
      var k = b + "|" + yearOf(m.id); (bucket[k] = bucket[k] || []).push(m.id);
    });
    var positions = {};
    roots.forEach(function (r) { positions[r] = { x: 0, y: 0 }; });
    Object.keys(bucket).forEach(function (k) {
      var parts = k.split("|"), b = parts[0], yr = +parts[1];
      var ids = bucket[k].sort(function (a, c) { return posInSeq[a] - posInSeq[c]; });
      var n = ids.length, span = spans[b];
      ids.forEach(function (id, i) {
        var radius = (yr - MIN_YEAR) * yearSpacing;
        var ang = span.start + ((i + 0.5) / n) * (span.end - span.start);
        positions[id] = { x: Math.cos(ang) * radius, y: Math.sin(ang) * radius };
      });
    });
    cy.batch(function () {
      cy.nodes().forEach(function (n) { if (positions[n.id()]) n.position(positions[n.id()]); });
    });
    cy.fit(undefined, 50);
  }

  /* ---------- Layout selector ---------- */
  var layoutBtns = document.querySelectorAll("#layouts .lbtn");
  var currentLayout = "cose";
  layoutBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      layoutBtns.forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
      currentLayout = b.getAttribute("data-layout");
      runLayout(currentLayout);
    });
  });
  layoutBtns[0].classList.add("active");

  // Deep-link por hash: #cose | #concentric | #sectores
  var wantLayout = (location.hash || "").replace("#", "");
  if (["cose", "concentric", "sectores"].indexOf(wantLayout) > -1) {
    layoutBtns.forEach(function (x) {
      x.classList.toggle("active", x.getAttribute("data-layout") === wantLayout);
    });
    currentLayout = wantLayout;
    setTimeout(function () { runLayout(currentLayout); }, 60);
  }

  /* ---------- Detalle ---------- */
  var detailEl = document.getElementById("detail");
  function showDetail(id) {
    var m = byId[id]; if (!m) return;
    var c = cColor(m.company);
    var parents = (m.parents || []).map(function (p) {
      var pp = byId[p];
      return pp ? '<span style="cursor:pointer" data-jump="' + p + '">' + pp.name + "</span>" : p;
    }).join(", ");
    detailEl.innerHTML =
      '<button class="close" id="dclose">✕</button>' +
      '<div class="company"><span class="dot" style="background:' + c + '"></span>' + m.company + "</div>" +
      '<h2>' + m.name + "</h2>" +
      (m.params ? '<div class="row">Parámetros: <b>' + m.params + "</b></div>" : "") +
      '<div class="row">Fecha: <b>' + m.date + "</b></div>" +
      '<div class="row">Tipo: <b>' + m.type + "</b></div>" +
      (parents ? '<div class="from">Desciende de: <b>' + parents + "</b></div>" : '<div class="from">Arquitectura raíz</div>') +
      (m.note ? '<div class="note">' + m.note + "</div>" : "");
    detailEl.style.display = "block";
    var jump = detailEl.querySelector('[data-jump]');
    if (jump) jump.addEventListener("click", function (e) {
      e.stopPropagation();
      var t = e.target.getAttribute("data-jump");
      cy.$("#" + t).select().panTo({ x: 0, y: 0 });
      cy.animate({ center: { eles: cy.$("#" + t) }, duration: 250 });
      showDetail(t);
    });
    detailEl.querySelector("#dclose").addEventListener("click", hideDetail);
  }
  function hideDetail() { detailEl.style.display = "none"; }

  cy.on("tap", "node", function (evt) { showDetail(evt.target.id()); });
  cy.on("tap", function (evt) { if (evt.target === cy) hideDetail(); });

  /* ---------- Filtros ---------- */
  var searchEl = document.getElementById("search");
  var fCompany = document.getElementById("fCompany");
  var fType = document.getElementById("fType");
  var fYear = document.getElementById("fYear");

  function fillFilters() {
    var comps = {}, types = {}, years = {};
    models.forEach(function (m) {
      comps[m.company] = true; types[m.type] = true; years[m.date.split("-")[0]] = true;
    });
    Object.keys(comps).sort().forEach(function (k) { fCompany.add(new Option(k, k)); });
    Object.keys(types).sort().forEach(function (k) { fType.add(new Option(k, k)); });
    Object.keys(years).sort().forEach(function (k) { fYear.add(new Option(k, k)); });
  }

  function applyFilter() {
    var q = searchEl.value.trim().toLowerCase();
    var fc = fCompany.value, ft = fType.value, fy = fYear.value;
    var vis = {};
    models.forEach(function (m) {
      var okQ = !q || m.name.toLowerCase().indexOf(q) !== -1;
      var okC = !fc || m.company === fc;
      var okT = !ft || m.type === ft;
      var okY = !fy || m.date.split("-")[0] === fy;
      if (okQ && okC && okT && okY) vis[m.id] = true;
    });
    var changed = true;
    while (changed) {
      changed = false;
      Object.keys(vis).forEach(function (id) {
        (byId[id].parents || []).forEach(function (p) { if (!vis[p]) { vis[p] = true; changed = true; } });
      });
    }
    cy.batch(function () {
      cy.nodes().forEach(function (n) {
        n.style("display", vis[n.id()] ? "element" : "none");
      });
      cy.edges().forEach(function (e) {
        var s = vis[e.source().id()] && vis[e.target().id()];
        e.style("display", s ? "element" : "none");
      });
    });
    document.getElementById("count").textContent = Object.keys(vis).length + " / " + models.length;
    cy.fit(undefined, 50);
  }

  [searchEl, fCompany, fType, fYear].forEach(function (el) {
    el.addEventListener("input", applyFilter);
    el.addEventListener("change", applyFilter);
  });

  /* ---------- Leyenda + tema ---------- */
  function buildLegend() {
    var legend = document.getElementById("legend");
    var html = "";
    Object.keys(companies).forEach(function (c) {
      html += '<span class="lg"><span class="sw" style="background:' + companies[c].color + '"></span>' + c + "</span>";
    });
    legend.innerHTML = html;
  }
  function refreshTheme() {
    cy.batch(function () {
      cy.nodes().forEach(function (n) {
        n.style("color", textColor());
        n.style("border-color", n.data("color"));
        n.style("background-color", n.data("color"));
        n.style("background-opacity", 0.16);
      });
      cy.edges().forEach(function (e) {
        e.style("line-color", edgeColor());
        e.style("target-arrow-color", edgeColor());
      });
    });
    cy.style().update();
  }

  document.getElementById("theme").addEventListener("click", function () {
    document.body.classList.toggle("dark");
    refreshTheme();
    cy.fit(undefined, 50);
  });

  /* ---------- Init ---------- */
  buildLegend();
  fillFilters();
  applyFilter();
})();
