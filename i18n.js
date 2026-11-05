/* MHVwork — taalschakelaar (Nederlands ⇄ English).
   Hoe het werkt: de app is in het Nederlands geschreven. Staat de taal op Engels, dan vertaalt dit script
   (a) elke tekst die op het scherm verschijnt, (b) placeholders/titels, en (c) meldingen/toasts, aan de hand
   van het woordenboek in i18n-en.js. Een tekst die (nog) niet in het woordenboek staat blijft gewoon Nederlands,
   dus er gaat nooit iets stuk. Ontbrekende teksten verzamelen: typ  MHVI18N.missing()  in de console. */
(function () {
  'use strict';
  var LS = 'mhv_lang';
  var lang = 'nl';
  try { lang = localStorage.getItem(LS) === 'en' ? 'en' : 'nl'; } catch (e) { }

  var EN = {}, RX = [], miss = {}, orig = new WeakMap(), origAttr = new WeakMap(), busy = false;
  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function tr(raw) {
    if (!raw) return null;
    var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0], s = norm(raw);
    if (!s || !/[A-Za-zÀ-ÿ]{2}/.test(s)) return null;
    var out = lookup(s);
    if (out === null) {
      // gesplitst op " · " / " — " / " – " / ": " : elk deel apart proberen
      var m = s.match(/\s([·—–])\s|(: )/);
      if (m) {
        var sep = m[1] ? ' ' + m[1] + ' ' : m[2], parts = s.split(sep), any = false, res = [];
        for (var i = 0; i < parts.length; i++) { var t = lookup(parts[i].trim()); if (t !== null) { any = true; res.push(t); } else res.push(parts[i]); }
        if (any) out = res.join(sep);
      }
    }
    if (out === null) { if (s.length < 140) miss[s] = (miss[s] || 0) + 1; return null; }
    return lead + out + trail;
  }
  function lookup(s) {
    if (Object.prototype.hasOwnProperty.call(EN, s)) return EN[s];
    for (var i = 0; i < RX.length; i++) { var m = RX[i][0].exec(s); if (m) return s.replace(RX[i][0], RX[i][1]); }
    return null;
  }

  function doText(n) {
    var v = n.nodeValue;
    if (lang === 'en') {
      var o = orig.get(n);
      if (o !== undefined && v === o.out) return;      // al vertaald
      var t = tr(v);
      if (t !== null && t !== v) { orig.set(n, { src: v, out: t }); n.nodeValue = t; }
    } else {
      var o2 = orig.get(n);
      if (o2 !== undefined && v === o2.out) { n.nodeValue = o2.src; orig.delete(n); }
    }
  }
  function doAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i]; if (!el.hasAttribute || !el.hasAttribute(a)) continue;
      var v = el.getAttribute(a), store = origAttr.get(el) || {};
      if (lang === 'en') {
        if (store[a] && store[a].out === v) continue;
        var t = tr(v); if (t !== null && t !== v) { store[a] = { src: v, out: t }; origAttr.set(el, store); el.setAttribute(a, t); }
      } else if (store[a] && store[a].out === v) { el.setAttribute(a, store[a].src); delete store[a]; }
    }
  }
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) { var tn = root.tagName; if (tn === 'SCRIPT' || tn === 'STYLE' || tn === 'TEXTAREA' || root.hasAttribute('data-no-i18n')) return; doAttrs(root); }
    var ch = root.childNodes;
    for (var i = 0; i < ch.length; i++) walk(ch[i]);
  }

  var obs = null, queue = [], sched = false;
  function flush() {
    sched = false; if (busy) return; busy = true;
    try { var q = queue; queue = []; for (var i = 0; i < q.length; i++) { if (q[i].isConnected !== false) walk(q[i]); } }
    finally { busy = false; if (obs) obs.takeRecords(); }
  }
  function schedule(n) { queue.push(n); if (!sched) { sched = true; (window.requestAnimationFrame || setTimeout)(flush); } }

  function observe() {
    if (obs || !document.body) return;
    obs = new MutationObserver(function (muts) {
      if (busy) return;
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData') schedule(m.target);
        else if (m.type === 'attributes') schedule(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) schedule(m.addedNodes[j]);
      }
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  function apply() {
    document.documentElement.setAttribute('lang', lang);
    if (document.body) { observe(); busy = true; try { walk(document.body); } finally { busy = false; if (obs) obs.takeRecords(); } }
    document.title = document.title; // (titel is merknaam, blijft MHVwork)
  }

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'nl';
    try { localStorage.setItem(LS, lang); } catch (e) { }
    apply();
    try { window.dispatchEvent(new CustomEvent('mhv:lang', { detail: lang })); } catch (e) { }
  }

  window.MHVI18N = {
    get lang() { return lang; },
    set: setLang,
    t: function (s) { if (lang !== 'en') return s; var r = tr(s); return r === null ? s : r; },
    locale: function () { return lang === 'en' ? 'en-GB' : 'nl-NL'; },
    add: function (dict, rx) { for (var k in dict) EN[norm(k)] = dict[k]; if (rx) for (var i = 0; i < rx.length; i++) RX.push(rx[i]); },
    missing: function () { var a = Object.keys(miss).sort(); console.log(a.length + ' ongeachte teksten'); return a; },
    apply: apply
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
