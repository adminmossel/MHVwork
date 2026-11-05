/* MHVwork — feestdagen-thema (sneeuw, confetti, lichtslinger).
   Wordt gedeeld door app.html en index.html (loginpagina).
   - Automatisch op basis van de datum, of geforceerd door de dev (Beheer → Instellingen → Feestdagen).
   - Iedereen kan het voor zichzelf uitzetten (Profiel → Weergave → Feestdageneffecten).
   - Respecteert "minder beweging" van het toestel en pauzeert in een verborgen tabblad. */
(function () {
  'use strict';
  var LS_OFF = 'mhv_fx_off';        // '1' = gebruiker heeft effecten uitgezet
  var LS_FORCE = 'mhv_holiday_force'; // 'auto' | 'off' | id van een feestdag (door dev ingesteld, gecachet)

  var HOL = {
    sinterklaas: { label: 'Sinterklaas',  kind: 'pepernoten', lights: false, colors: ['#8b5a2b', '#a9713a', '#6f4420'] },
    kerst:       { label: 'Kerst',        kind: 'snow',       lights: true,  colors: ['#ffffff'] },
    nieuwjaar:   { label: 'Oud & nieuw',  kind: 'confetti',   lights: false, colors: ['#ffd60a', '#ff453a', '#30d158', '#0a84ff', '#ffffff', '#bf5af2'] },
    koningsdag:  { label: 'Koningsdag',   kind: 'confetti',   lights: false, colors: ['#ff7f00', '#ff9f0a', '#ffffff', '#ff6a00'] },
    halloween:   { label: 'Halloween',    kind: 'bats',       lights: false, colors: ['#ff7518', '#1c1c1e'] },
    pasen:       { label: 'Pasen',        kind: 'eggs',       lights: false, colors: ['#ffd1dc', '#c7ceea', '#b5ead7', '#fff3b0', '#ffdac1'] }
  };

  function easter(y) { // anonieme Gregoriaanse algoritme
    var a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4,
      f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
      i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
      month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }

  function detect(now) {
    now = now || new Date();
    var y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
    var day = new Date(y, m - 1, d).getTime(), DAY = 86400000;
    var e = easter(y).getTime();
    if (day >= e - 2 * DAY && day <= e + DAY) return 'pasen';                      // Goede Vrijdag t/m 2e paasdag
    if (m === 4 && d >= 24 && d <= 27) return 'koningsdag';
    if (m === 10 && d >= 25 && d <= 31) return 'halloween';
    if (m === 11 && d >= 15 || (m === 12 && d <= 5)) return 'sinterklaas';
    if (m === 12 && d >= 6 && d <= 26) return 'kerst';
    if ((m === 12 && d >= 27) || (m === 1 && d <= 2)) return 'nieuwjaar';
    return null;
  }

  function force() { try { return localStorage.getItem(LS_FORCE) || 'auto'; } catch (e) { return 'auto'; } }
  function current(now) {
    var f = force();
    if (f === 'off') return null;
    if (f !== 'auto' && HOL[f]) return f;
    return detect(now);
  }
  function userOff() { try { return localStorage.getItem(LS_OFF) === '1'; } catch (e) { return false; } }
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  var cv, ctx, parts = [], raf = 0, running = false, kind = null, W = 0, H = 0, dpr = 1, lightsEl = null, curId = null;

  function isLight() { return document.documentElement.getAttribute('data-theme') === 'light'; }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function make(init) {
    var cfg = HOL[curId], c = cfg.colors[(Math.random() * cfg.colors.length) | 0];
    var p = { x: rnd(0, W), y: init ? rnd(-H, H) : rnd(-40, -5), c: c, t: rnd(0, 6.28), s: rnd(.6, 1.4), r: 0 };
    if (kind === 'snow')       { p.r = rnd(1.4, 4.2); p.vy = rnd(.35, 1.1) * p.s; p.vx = rnd(-.25, .25); }
    if (kind === 'pepernoten') { p.r = rnd(2.2, 4.6); p.vy = rnd(.6, 1.5);        p.vx = rnd(-.4, .4); }
    if (kind === 'confetti')   { p.w = rnd(5, 9); p.h = rnd(3, 5); p.vy = rnd(.9, 2.2); p.vx = rnd(-.5, .5); p.rot = rnd(0, 6.28); p.vr = rnd(-.12, .12); }
    if (kind === 'bats')       { p.r = rnd(5, 9); p.vy = rnd(.25, .7); p.vx = rnd(.4, 1.1) * (Math.random() < .5 ? -1 : 1); p.c = Math.random() < .35 ? '#ff7518' : (isLight() ? '#2a2a2e' : '#9a9aa2'); }
    if (kind === 'eggs')       { p.r = rnd(4, 7); p.vy = rnd(.5, 1.2); p.vx = rnd(-.3, .3); p.rot = rnd(-.6, .6); }
    return p;
  }

  function resize() {
    if (!cv) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.max(24, Math.min(kind === 'bats' ? 14 : 90, Math.round(W * H / 11000)));
    while (parts.length < n) parts.push(make(true));
    parts.length = n;
  }

  function drawBat(p) {
    ctx.save(); ctx.translate(p.x, p.y); ctx.scale(p.vx < 0 ? -1 : 1, 1);
    var flap = Math.sin(p.t * 6) * .5 + .5, r = p.r;
    ctx.fillStyle = p.c; ctx.beginPath();
    ctx.moveTo(0, 0); ctx.quadraticCurveTo(r * .7, -r * (.3 + flap * .6), r * 1.8, -r * .2);
    ctx.quadraticCurveTo(r * 1.2, r * .3, r * .6, r * .2); ctx.quadraticCurveTo(r * .3, r * .6, 0, r * .5);
    ctx.quadraticCurveTo(-r * .3, r * .6, -r * .6, r * .2); ctx.quadraticCurveTo(-r * 1.2, r * .3, -r * 1.8, -r * .2);
    ctx.quadraticCurveTo(-r * .7, -r * (.3 + flap * .6), 0, 0); ctx.fill(); ctx.restore();
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    var light = isLight();
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.t += .02 * p.s;
      p.y += p.vy;
      p.x += (p.vx || 0) + (kind === 'snow' ? Math.sin(p.t) * .35 : 0);
      if (kind === 'snow') {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fillStyle = light ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.88)'; ctx.fill();
        if (light) { ctx.strokeStyle = 'rgba(110,140,190,.55)'; ctx.lineWidth = 1; ctx.stroke(); }
      } else if (kind === 'pepernoten') {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = p.c; ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.fillRect(p.x - 1, p.y - 1, 1.5, 1.5);
      } else if (kind === 'confetti') {
        p.rot += p.vr; p.x += Math.sin(p.t) * .4;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * (.4 + Math.abs(Math.sin(p.t * 2)))); ctx.restore();
      } else if (kind === 'bats') {
        p.y += Math.sin(p.t * 2) * .6; drawBat(p);
      } else if (kind === 'eggs') {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot + Math.sin(p.t) * .3); ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.ellipse(0, 0, p.r * .75, p.r, 0, 0, 6.283); ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-p.r * .7, 0); ctx.lineTo(p.r * .7, 0); ctx.stroke(); ctx.restore();
      }
      if (p.y > H + 20 || p.x < -40 || p.x > W + 40) parts[i] = make(false);
    }
    raf = requestAnimationFrame(frame);
  }

  function buildLights() {
    if (lightsEl) return;
    lightsEl = document.createElement('div');
    lightsEl.id = 'fxLights'; lightsEl.setAttribute('aria-hidden', 'true');
    var cols = ['#ff453a', '#ffd60a', '#30d158', '#0a84ff'], n = Math.ceil(window.innerWidth / 34), h = '';
    for (var i = 0; i < n; i++) h += '<i style="--c:' + cols[i % 4] + ';animation-delay:' + ((i % 4) * .35) + 's;margin-top:' + (i % 2 ? 4 : 0) + 'px"></i>';
    lightsEl.innerHTML = h;
    document.body.appendChild(lightsEl);
  }

  function injectCss() {
    if (document.getElementById('fxCss')) return;
    var s = document.createElement('style'); s.id = 'fxCss';
    s.textContent =
      '#fxCanvas{position:fixed;inset:0;pointer-events:none;z-index:45}' +
      '#fxLights{position:fixed;left:0;right:0;top:env(safe-area-inset-top,0px);height:20px;display:flex;justify-content:space-around;pointer-events:none;z-index:46;overflow:hidden;' +
      'background:linear-gradient(#0000 0 0) center 3px/100% 1.5px no-repeat,#0000}' +
      '#fxLights i{display:block;width:9px;height:13px;border-radius:50% 50% 50% 50%/40% 40% 60% 60%;background:var(--c);box-shadow:0 0 9px 2px var(--c);animation:fxTw 1.4s ease-in-out infinite;opacity:.95}' +
      '@keyframes fxTw{0%,100%{opacity:.35;transform:scale(.9)}50%{opacity:1;transform:scale(1.05)}}' +
      '@media (prefers-reduced-motion:reduce){#fxLights i{animation:none}}';
    document.head.appendChild(s);
  }

  function start() {
    var id = current();
    stop();
    if (!id || userOff() || !document.body) return false;
    curId = id; kind = HOL[id].kind;
    document.documentElement.setAttribute('data-holiday', id);
    injectCss();
    if (HOL[id].lights) buildLights();
    if (reduced()) return true; // wel de lichtjes/data-attribuut, geen bewegende deeltjes
    cv = document.createElement('canvas'); cv.id = 'fxCanvas'; cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv); ctx = cv.getContext('2d'); parts = [];
    resize(); running = true; raf = requestAnimationFrame(frame);
    return true;
  }
  function stop() {
    running = false; cancelAnimationFrame(raf); parts = [];
    var c = document.getElementById('fxCanvas'); if (c) c.remove();
    var l = document.getElementById('fxLights'); if (l) l.remove();
    lightsEl = null; cv = null; ctx = null; curId = null;
    document.documentElement.removeAttribute('data-holiday');
  }

  window.addEventListener('resize', function () { if (running) resize(); });
  document.addEventListener('visibilitychange', function () {
    if (!cv) return;
    if (document.hidden) { running = false; cancelAnimationFrame(raf); }
    else if (!running) { running = true; raf = requestAnimationFrame(frame); }
  });

  window.MHVFX = {
    HOL: HOL, detect: detect, current: current, start: start, stop: stop, easter: easter,
    setForce: function (v) { try { localStorage.setItem(LS_FORCE, v || 'auto'); } catch (e) { } },
    setUserOff: function (off) { try { if (off) localStorage.setItem(LS_OFF, '1'); else localStorage.removeItem(LS_OFF); } catch (e) { } },
    userOff: userOff
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { start(); });
  else start();
})();
