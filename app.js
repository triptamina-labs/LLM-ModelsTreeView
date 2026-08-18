/* Genealogía de modelos LLM — visor "genético" con vis-network */
(function () {
  "use strict";

  var DATA = window.LLM_MODELS;
  var companies = DATA.companies;
  var models = DATA.models;

  var byId = {};
  models.forEach(function (m) { byId[m.id] = m; });

  var networkEl = document.getElementById("network");
  var network = null;
  var nodesDS = new vis.DataSet([]);
  var edgesDS = new vis.DataSet([]);

  var REL = {
    invoked: "desciende de",
    base: "desciende de",
    inspirado: "inspirado en"
  };

  function relLabel(parentId) {
    // Determina la etiqueta de relación hacia el padre.
    // Simple: 'desciende de' salvo notas de inspiración.
    return "desciende de";
  }

  function makeNodes() {
    return models.map(function (m) {
      var c = companies[m.company] || { color: "#888" };
      return {
        id: m.id,
        label: m.name,
        title: m.name,
        color: { background: c.color, border: c.color, highlight: { background: c.color, border: "#000" } },
        font: { color: getComputedStyle(document.body).getPropertyValue("--text").trim() || "#000", size: 13, face: "-apple-system, 'SF Pro Text', Segoe UI, Roboto, sans-serif" },
        shape: "box",
        borderWidth: 2,
        margin: { top: 6, right: 10, bottom: 6, left: 10 },
        model: m
      };
    });
  }

  function makeEdges() {
    var edges = [];
    models.forEach(function (m) {
      (m.parents || []).forEach(function (p, i) {
        edges.push({
          id: m.id + "_" + p + "_" + i,
          from: p,
          to: m.id,
          arrows: "to",
          color: { color: "#b0b0b8", highlight: "#888" },
          width: 1.4,
          smooth: { enabled: true, type: "cubicBezier", forceDirection: "horizontal" }
        });
      });
    });
    return edges;
  }

  function readVar(name, fallback) {
    var v = getComputedStyle(document.body).getPropertyValue(name).trim();
    return v || fallback;
  }

  function themeColors() {
    return {
      text: readVar("--text", "#1d1d1f"),
      bg: readVar("--network-bg", "#ffffff"),
      edge: readVar("--muted", "#6e6e73")
    };
  }

  /* Layout circular por sectores: Transformer (raíz) al centro. Cada familia
     top (hija directa de la raíz) ocupa su propia porción del círculo y crece
     en anillos concéntricos dentro de ese sector — así los edges no cruzan
     entre familias y el árbol queda ordenado, sin enredarse. */
  function circularPositions() {
    var childMap = {};
    models.forEach(function (m) {
      (m.parents || []).forEach(function (p) { (childMap[p] = childMap[p] || []).push(m.id); });
    });
    var roots = models.filter(function (m) {
      return !m.parents || !m.parents.length;
    }).map(function (m) { return m.id; });
    var rootSet = {};
    roots.forEach(function (r) { rootSet[r] = true; });

    // branch = ancestro directo de raíz (familia top). "__ROOT__" para raíces.
    function branchOf(id, memo) {
      if (memo[id] !== undefined) return memo[id];
      var m = byId[id];
      if (!m.parents || !m.parents.length) { memo[id] = "__ROOT__"; return "__ROOT__"; }
      var isRootChild = m.parents.some(function (p) { return rootSet[p]; });
      if (isRootChild) { memo[id] = id; return id; }
      memo[id] = branchOf(m.parents[0], memo);
      return memo[id];
    }

    // profundidad (BFS)
    var depth = {}, queue = [];
    roots.forEach(function (r) { depth[r] = 0; queue.push(r); });
    var qi = 0;
    while (qi < queue.length) {
      var id = queue[qi++], d = depth[id];
      (childMap[id] || []).forEach(function (c) {
        if (depth[c] === undefined || d + 1 > depth[c]) { depth[c] = d + 1; queue.push(c); }
      });
    }

    // sectores por familia, proporcionales a su cantidad de nodos
    var brCounts = {}, nodesBranch = {};
    models.forEach(function (m) {
      var b = branchOf(m.id, {});
      nodesBranch[m.id] = b;
      if (b !== "__ROOT__") brCounts[b] = (brCounts[b] || 0) + 1;
    });
    var brIds = Object.keys(brCounts).sort();
    var total = brIds.reduce(function (s, b) { return s + brCounts[b]; }, 0) || 1;
    var spans = {}, start = 0;
    brIds.forEach(function (b) {
      var frac = (brCounts[b] / total) * 2 * Math.PI;
      spans[b] = { start: start, end: start + frac };
      start += frac;
    });

    var pos = {}, ringSpacing = 200;
    roots.forEach(function (r) { pos[r] = { x: 0, y: 0 }; });

    // preorden por rama para mantener cada linaje contiguo (menos cruces)
    var seq = [];
    function preorder(n, b) {
      (childMap[n] || []).slice().sort().forEach(function (c) {
        if (nodesBranch[c] === b) preorder(c, b);
      });
      seq.push(n);
    }
    brIds.forEach(function (b) { preorder(b, b); });
    var posInSeq = {};
    seq.forEach(function (id, i) { posInSeq[id] = i; });

    // colocar nodos por (familia, profundidad), distribuidos en el sector
    var depthNodes = {};
    models.forEach(function (m) {
      var b = nodesBranch[m.id];
      if (b === "__ROOT__") return;
      var k = b + "|" + depth[m.id];
      (depthNodes[k] = depthNodes[k] || []).push(m.id);
    });
    Object.keys(depthNodes).forEach(function (k) {
      var parts = k.split("|"), b = parts[0], d = +parts[1];
      var ids = depthNodes[k].sort(function (a, c) { return posInSeq[a] - posInSeq[c]; });
      var n = ids.length, span = spans[b];
      ids.forEach(function (id, i) {
        var radius = d * ringSpacing;
        var ang = span.start + ((i + 0.5) / n) * (span.end - span.start);
        pos[id] = { x: Math.cos(ang) * radius, y: Math.sin(ang) * radius };
      });
    });
    return pos;
  }

  function buildNetwork() {
    var t = themeColors();
    nodesDS.clear();
    edgesDS.clear();
    var pos = circularPositions();
    makeNodes().forEach(function (n) {
      n.x = pos[n.id].x;
      n.y = pos[n.id].y;
      n.font.color = t.text;
      nodesDS.add(n);
    });
    edgesDS.add(makeEdges());

    var options = {
      autoResize: true,
      layout: { randomSeed: 2 },
      physics: false,
      interaction: { hover: true, tooltipDelay: 0 },
      nodes: { shape: "box" },
      edges: { smooth: { enabled: true, type: "cubicBezier" } },
      groups: {}
    };

    network = new vis.Network(networkEl, { nodes: nodesDS, edges: edgesDS }, options);

    network.on("click", function (params) {
      if (params.nodes && params.nodes.length) {
        showDetail(params.nodes[0]);
      } else {
        hideDetail();
      }
    });
    network.on("oncontext", function () { hideDetail(); });
  }

  /* ---------- Detalle ---------- */
  var detailEl = document.getElementById("detail");

  function showDetail(id) {
    var m = byId[id];
    if (!m) return;
    var c = companies[m.company] || { color: "#888" };
    var parents = (m.parents || []).map(function (p) {
      var pp = byId[p];
      return pp ? '<span style="cursor:pointer" data-jump="' + p + '">' + pp.name + "</span>" : p;
    }).join(", ");

    detailEl.innerHTML =
      '<button class="close" id="dclose">✕</button>' +
      '<div class="company"><span class="dot" style="background:' + c.color + '"></span>' + m.company + "</div>" +
      '<h2>' + m.name + "</h2>" +
      (m.params ? '<div class="row">Parámetros: <b>' + m.params + "</b></div>" : "") +
      '<div class="row">Fecha: <b>' + m.date + "</b></div>" +
      '<div class="row">Tipo: <b>' + m.type + "</b></div>" +
      (parents ? '<div class="from">Desciende de: <b>' + parents + "</b></div>" : '<div class="from">Arquitectura raíz</div>') +
      (m.note ? '<div class="note">' + m.note + "</div>" : "");
    detailEl.style.display = "block";

    detailEl.querySelector('[data-jump]') && detailEl.querySelector('[data-jump]').addEventListener("click", function (e) {
      e.stopPropagation();
      var target = e.target.getAttribute("data-jump");
      network.focus(target, { scale: 1.0 });
      network.selectNodes([target]);
      showDetail(target);
    });
    detailEl.querySelector("#dclose").addEventListener("click", hideDetail);
  }

  function hideDetail() { detailEl.style.display = "none"; }

  /* ---------- Filtros ---------- */
  var searchEl = document.getElementById("search");
  var fCompany = document.getElementById("fCompany");
  var fType = document.getElementById("fType");
  var fYear = document.getElementById("fYear");

  function fillFilters() {
    var comps = {}, types = {}, years = {};
    models.forEach(function (m) {
      comps[m.company] = true;
      types[m.type] = true;
      var y = m.date.split("-")[0];
      years[y] = true;
    });
    Object.keys(comps).sort().forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.text = k; fCompany.appendChild(o);
    });
    Object.keys(types).sort().forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.text = k; fType.appendChild(o);
    });
    Object.keys(years).sort().forEach(function (k) {
      var o = document.createElement("option");
      o.value = k; o.text = k; fYear.appendChild(o);
    });
  }

  function applyFilter() {
    var q = searchEl.value.trim().toLowerCase();
    var fc = fCompany.value, ft = fType.value, fy = fYear.value;
    var visible = {};
    models.forEach(function (m) {
      var matchQ = !q || m.name.toLowerCase().indexOf(q) !== -1;
      var matchC = !fc || m.company === fc;
      var matchT = !ft || m.type === ft;
      var matchY = !fy || m.date.split("-")[0] === fy;
      if (matchQ && matchC && matchT && matchY) visible[m.id] = true;
    });

    // Mostrar también los ancestros de los visibles para no romper el árbol.
    var changed = true;
    while (changed) {
      changed = false;
      Object.keys(visible).forEach(function (id) {
        (byId[id].parents || []).forEach(function (p) {
          if (!visible[p]) { visible[p] = true; changed = true; }
        });
      });
    }

    var visIds = Object.keys(visible);
    nodesDS.forEach(function (n) {
      nodesDS.update({ id: n.id, hidden: !visible[n.id] });
    });
    edgesDS.forEach(function (e) {
      var show = visible[e.from] && visible[e.to];
      edgesDS.update({ id: e.id, hidden: !show });
    });
    document.getElementById("count").textContent = visIds.length + " / " + models.length;

    if (network) {
      network.redraw();
      network.fit({ animation: true });
    }
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

  document.getElementById("theme").addEventListener("click", function () {
    document.body.classList.toggle("dark");
    buildNetwork();
    applyFilter();
  });

  /* ---------- Init ---------- */
  buildLegend();
  fillFilters();
  buildNetwork();
  applyFilter();
})();
