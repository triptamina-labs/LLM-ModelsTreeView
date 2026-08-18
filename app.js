/* Genealogía de modelos LLM — visor "genético" con D3 + d3-force */
(function () {
  "use strict";

  var DATA = window.LLM_MODELS;
  var companies = DATA.companies;
  var models = DATA.models;
  var byId = {};
  models.forEach(function (m) { byId[m.id] = m; });

  /* --- Distancia temporal: cada nodo anclado a su radio = meses desde el origen --- */
  var PX_PER_MONTH = 26; // píxeles por mes en el radio
  function monthsOf(date) {
    var p = String(date).split("-");
    return (parseInt(p[0], 10) || 2017) * 12 + ((parseInt(p[1], 10) || 1) - 1);
  }
  var MIN_MONTHS = Infinity;
  models.forEach(function (m) { MIN_MONTHS = Math.min(MIN_MONTHS, monthsOf(m.date)); });

  function cColor(c) { return (companies[c] && companies[c].color) || "#888888"; }
  function readVar(n, fb) { return getComputedStyle(document.body).getPropertyValue(n).trim() || fb; }
  function textColor() { return readVar("--text", "#1d1d1f"); }
  function edgeColor() { return readVar("--muted", "#6e6e73"); }

  /* Familia top por nodo (ancestro directo de la raíz) */
  var childMap = {};
  models.forEach(function (m) { (m.parents || []).forEach(function (p) { (childMap[p] = childMap[p] || []).push(m.id); }); });
  var roots = models.filter(function (m) { return !m.parents || !m.parents.length; }).map(function (m) { return m.id; });
  var rootSet = {}; roots.forEach(function (r) { rootSet[r] = true; });
  var famOf = {};
  function familyOf(id, memo) {
    memo = memo || {};
    if (memo[id] !== undefined) return memo[id];
    var m = byId[id];
    if (!m.parents || !m.parents.length) { memo[id] = "__ROOT__"; return "__ROOT__"; }
    if (m.parents.some(function (p) { return rootSet[p]; })) { memo[id] = id; return id; }
    memo[id] = familyOf(m.parents[0], memo); return memo[id];
  }
  models.forEach(function (m) { famOf[m.id] = familyOf(m.id, {}); });

  /* ---------- Contenedor ---------- */
  var netEl = document.getElementById("net");
  var width = netEl.clientWidth || 1200;
  var height = netEl.clientHeight || 700;

  var svg = d3.select("#net").append("svg")
    .attr("width", width).attr("height", height);
  var g = svg.append("g");
  var zoom = d3.zoom().scaleExtent([0.02, 8]).on("zoom", function (ev) { g.attr("transform", ev.transform); });
  svg.call(zoom);
  svg.on("dblclick.zoom", null); // doble-clic reservado a los nodos
  svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2));

  /* ---------- Datos de grafo ---------- */
  function makeNodes(arr) {
    return arr.map(function (m) {
      var w = m.name.length * 6.3 + 14, h = 24;
      return {
        id: m.id, label: m.name, company: m.company, type: m.type,
        date: m.date, params: m.params, note: m.note, fam: famOf[m.id],
        w: w, h: h, r: Math.hypot(w, h) / 2 + 6,   // radio de colisión (circunferencia)
        rTarget: (monthsOf(m.date) - MIN_MONTHS) * PX_PER_MONTH  // ancla radial = meses
      };
    });
  }
  function makeLinks(arr) {
    var ids = {}; arr.forEach(function (n) { ids[n.id] = 1; });
    var links = [];
    models.forEach(function (m) {
      if (!ids[m.id]) return;
      (m.parents || []).forEach(function (p) {
        if (ids[p]) links.push({ source: p, target: m.id });
      });
    });
    return links;
  }
  var allNodes = makeNodes(models);
  var nodeByKey = {};
  allNodes.forEach(function (n) { nodeByKey[n.id] = n; });

  /* ---------- Elementos SVG ---------- */
  var linkSel = g.append("g").selectAll("line").data([], function (d) { return d.id; });
  var nodeSel = g.append("g").selectAll("g").data([], function (d) { return d.id; });

  var drag = d3.drag()
    .on("start", function (ev, d) {
      if (!ev.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x; d.fy = d.y;
    })
    .on("drag", function (ev, d) { d.fx = ev.x; d.fy = ev.y; })
    .on("end", function (ev, d) {
      if (!ev.active) simulation.alphaTarget(0);
      d.fx = null; d.fy = null;
    });

  function refresh() {
    var visIds = {};
    currentNodes.forEach(function (n) { visIds[n.id] = 1; });
    var links = [];
    currentNodes.forEach(function (n) {
      (byId[n.id].parents || []).forEach(function (p) {
        if (visIds[p]) links.push({ source: p, target: n.id });
      });
    });

    linkSel = linkSel.data(links, function (d) { return d.source + "->" + d.target; })
      .join("line")
      .attr("class", "link");

    nodeSel = nodeSel.data(currentNodes, function (d) { return d.id; })
      .join("g")
      .attr("class", "node")
      .call(drag);

    nodeSel.selectAll("rect").data(function (d) { return [d]; }).join("rect")
      .attr("x", function (d) { return -d.w / 2; })
      .attr("y", function (d) { return -d.h / 2; })
      .attr("width", function (d) { return d.w; })
      .attr("height", function (d) { return d.h; })
      .attr("rx", 6)
      .attr("fill", function (d) { return cColor(d.company); })
      .attr("stroke", function (d) { return cColor(d.company); });
    nodeSel.selectAll("text").data(function (d) { return [d]; }).join("text")
      .attr("x", 0).attr("y", 4)
      .attr("text-anchor", "middle")
      .attr("fill", textColor())
      .text(function (d) { return d.label; });

    nodeSel.on("click", function (ev, d) { ev.stopPropagation(); showDetail(d.id); });
    nodeSel.on("dblclick", function (ev, d) {
      ev.preventDefault();
      svg.transition().duration(300).call(zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(1.6).translate(-d.x, -d.y));
    });

    linkSel.on("click", function () { hideDetail(); });
    svg.on("click", hideDetail);

    simulation.nodes(currentNodes);
    simulation.force("link").links(links);
    simulation.alpha(0.9).restart();
    document.getElementById("count").textContent = currentNodes.length + " / " + models.length;
  }

  /* ---------- Simulación de fuerzas ---------- */
  function clusterForce(strength) {
    var nodes;
    function force(alpha) {
      var k = strength * alpha;
      var sum = {};
      nodes.forEach(function (n) {
        var f = n.fam; if (f === "__ROOT__") return;
        var s = sum[f] || (sum[f] = { x: 0, y: 0, c: 0 });
        s.x += n.x; s.y += n.y; s.c++;
      });
      nodes.forEach(function (n) {
        var f = n.fam; if (f === "__ROOT__") return;
        var s = sum[f];
        if (s && s.c) { n.vx += (s.x / s.c - n.x) * k; n.vy += (s.y / s.c - n.y) * k; }
      });
    }
    force.initialize = function (_) { nodes = _; };
    return force;
  }

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(90).strength(0.15))
    .force("collide", d3.forceCollide().radius(function (d) { return d.r; }).iterations(4))
    .force("cluster", clusterForce(0.12))
    .on("tick", ticked)
    .on("end", fitView);

  // Ajustar el zoom para que el árbol temporal (radio = meses) quepa a la vista
  function fitView() {
    var maxR = 0;
    currentNodes.forEach(function (n) { if (n.rTarget > maxR) maxR = n.rTarget; });
    if (!maxR) maxR = 1;
    var scale = Math.min(width, height) / (maxR * 2 + 80);
    svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(scale));
  }

  function ticked() {
    currentNodes.forEach(pinNode); // fija el radio = meses (distancia exacta al centro)
    linkSel
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });
    nodeSel.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
  }

  // Ancla dura: cada nodo a distancia exacta rTarget (meses) del centro (0,0)
  function pinNode(n) {
    if (!n.rTarget) { n.x = 0; n.y = 0; return; }
    var r = Math.hypot(n.x, n.y);
    if (r < 0.001) { var a = Math.random() * 2 * Math.PI; n.x = Math.cos(a) * n.rTarget; n.y = Math.sin(a) * n.rTarget; return; }
    var k = n.rTarget / r;
    n.x *= k; n.y *= k;
  }

  /* ---------- Filtros ---------- */
  var currentNodes = allNodes.slice();
  var searchEl = document.getElementById("search");
  var fCompany = document.getElementById("fCompany");
  var fType = document.getElementById("fType");
  var fYear = document.getElementById("fYear");

  (function fillFilters() {
    var comps = {}, types = {}, years = {};
    models.forEach(function (m) {
      comps[m.company] = 1; types[m.type] = 1; years[m.date.split("-")[0]] = 1;
    });
    Object.keys(comps).sort().forEach(function (k) { fCompany.add(new Option(k, k)); });
    Object.keys(types).sort().forEach(function (k) { fType.add(new Option(k, k)); });
    Object.keys(years).sort().forEach(function (k) { fYear.add(new Option(k, k)); });
  })();

  function applyFilter() {
    var q = searchEl.value.trim().toLowerCase();
    var fc = fCompany.value, ft = fType.value, fy = fYear.value;
    var vis = {};
    models.forEach(function (m) {
      var okQ = !q || m.name.toLowerCase().indexOf(q) !== -1;
      var okC = !fc || m.company === fc;
      var okT = !ft || m.type === ft;
      var okY = !fy || m.date.split("-")[0] === fy;
      if (okQ && okC && okT && okY) vis[m.id] = 1;
    });
    var changed = true;
    while (changed) {
      changed = false;
      Object.keys(vis).forEach(function (id) {
        (byId[id].parents || []).forEach(function (p) { if (!vis[p]) { vis[p] = 1; changed = true; } });
      });
    }
    currentNodes = allNodes.filter(function (n) { return vis[n.id]; });
    refresh();
  }
  [searchEl, fCompany, fType, fYear].forEach(function (el) {
    el.addEventListener("input", applyFilter);
    el.addEventListener("change", applyFilter);
  });

  /* ---------- Detalle ---------- */
  var detailEl = document.getElementById("detail");
  function showDetail(id) {
    var m = byId[id]; if (!m) return;
    var parents = (m.parents || []).map(function (p) {
      var pp = byId[p];
      return pp ? '<span style="cursor:pointer" data-jump="' + p + '">' + pp.name + "</span>" : p;
    }).join(", ");
    detailEl.innerHTML =
      '<button class="close" id="dclose">✕</button>' +
      '<div class="company"><span class="dot" style="background:' + cColor(m.company) + '"></span>' + m.company + "</div>" +
      '<h2>' + m.name + "</h2>" +
      (m.params ? '<div class="row">Parámetros: <b>' + m.params + "</b></div>" : "") +
      '<div class="row">Fecha: <b>' + m.date + "</b></div>" +
      '<div class="row">Tipo: <b>' + m.type + "</b></div>" +
      (parents ? '<div class="from">Desciende de: <b>' + parents + "</b></div>" : '<div class="from">Arquitectura raíz</div>') +
      (m.note ? '<div class="note">' + m.note + "</div>" : "");
    detailEl.style.display = "block";
    var jump = detailEl.querySelector("[data-jump]");
    if (jump) jump.addEventListener("click", function (e) {
      e.stopPropagation();
      var t = e.target.getAttribute("data-jump");
      var n = nodeByKey[t]; if (!n) return;
      svg.transition().duration(300).call(zoom.transform,
        d3.zoomIdentity.translate(width / 2, height / 2).scale(1.4).translate(-n.x, -n.y));
      showDetail(t);
    });
    detailEl.querySelector("#dclose").addEventListener("click", hideDetail);
  }
  function hideDetail() { detailEl.style.display = "none"; }

  /* ---------- Leyenda + tema ---------- */
  (function buildLegend() {
    var html = "";
    Object.keys(companies).forEach(function (c) {
      html += '<span class="lg"><span class="sw" style="background:' + companies[c].color + '"></span>' + c + "</span>";
    });
    document.getElementById("legend").innerHTML = html;
  })();

  document.getElementById("theme").addEventListener("click", function () {
    document.body.classList.toggle("dark");
    svg.selectAll(".node text").attr("fill", textColor());
    svg.selectAll(".link").style("stroke", edgeColor());
  });

  function resize() {
    width = netEl.clientWidth || width;
    height = netEl.clientHeight || height;
    svg.attr("width", width).attr("height", height);
    fitView();
  }
  window.addEventListener("resize", resize);

  /* ---------- Init ---------- */
  refresh();
})();
