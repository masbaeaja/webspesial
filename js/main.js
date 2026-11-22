/* Adinda in Pink: interactions */
(() => {
  'use strict';
  const root = document.documentElement;
  const body = document.body;
  root.classList.add('js');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const ICON = {
    heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.6.7-1.4 2.2-2.6 4.3-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M11 3h2v10.2l3.6-3.6 1.4 1.4-6 6-6-6 1.4-1.4 3.6 3.6zM4 19h16v2H4z"/></svg>',
    full: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5v2H6v3H4zm10-5h6v5h-2V6h-4V4zM4 15h2v3h3v2H4v-5zm14 3v-3h2v5h-6v-2h4z"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M18 16a3 3 0 0 0-2.4 1.2l-6.8-3.4a3 3 0 0 0 0-1.6l6.8-3.4A3 3 0 1 0 15 7a3 3 0 0 0 .1.8L8.3 11.2a3 3 0 1 0 0 3.6l6.8 3.4A3 3 0 1 0 18 16z"/></svg>'
  };

  /* ================================================================ data */
  const films = [
    { id: 'aesthetic', title: 'Pink Aesthetic', file: 'videos/adinda-pink-aesthetic.mp4', poster: 'img/poster-aesthetic.jpg',
      ar: '4/5', dur: '0:19', size: '1080 × 1350', isNew: true,
      text: 'Layar kunci, kolase polaroid, postingan Instagram, dan chat manis dalam nuansa pink.' },
    { id: 'typography', title: 'Pinky Typography', file: 'videos/adinda-pinky-typography.mp4', poster: 'img/poster-typography.jpg',
      ar: '1/1', dur: '0:44', size: '1080 × 1080',
      text: 'Gelembung chat, ketikan caption, dan teks besar yang bergerak mengikuti lagu.' },
    { id: 'story', title: 'Pink Story', file: 'videos/adinda-pink-story.mp4', poster: 'img/poster-story.jpg',
      ar: '4/5', dur: '0:21', size: '1080 × 1350',
      text: 'Gaya insta story serba pink dengan stiker lucu dan foto-foto Adinda.' }
  ];
  const photos = [['hero', 'senyum'], ['p1', 'malu-malu'], ['p2', 'manis'], ['p3', 'gaun pink'], ['p4', 'santai'],
                  ['p5', 'anggun'], ['p7', 'senja'], ['p6', 'cerah']];

  /* ================================================================ toast */
  const toastEl = $('#toast');
  let toastTimer = 0;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  /* ================================================================ render */
  const rots = [-4, 3, -2, 5, -3, 2, -5, 4];
  const pola = (f, cap, i, dup) =>
    `<button class="pola" type="button" style="--r:${rots[i % rots.length]}deg" data-photo="${i}" ${dup ? 'tabindex="-1" aria-hidden="true"' : `aria-label="Lihat foto ${cap}"`}>` +
    `<img src="img/${f}.jpg" alt="${dup ? '' : 'Foto Adinda, ' + cap}" loading="lazy" decoding="async"><span>${cap}</span></button>`;
  $('#belt').innerHTML = photos.map(([f, c], i) => pola(f, c, i, false)).join('') + photos.map(([f, c], i) => pola(f, c, i, true)).join('');

  const words = ['adindacantiknyakiky', 'pinky forever', 'so cute', 'cantik selamanya', 'sweet as candy'];
  const run = words.map(w => `<span>${w} ♡</span>`).join('');
  $('#track').innerHTML = run.repeat(4);

  const likeKey = id => 'adinda-like-' + id;
  const isLiked = id => { try { return localStorage.getItem(likeKey(id)) === '1'; } catch (e) { return false; } };
  $('#grid').innerHTML = films.map(f => `
    <article class="film reveal" id="film-${f.id}">
      <div class="bezel">
        <div class="screen" style="--ar:${f.ar}">
          <video id="v-${f.id}" playsinline preload="none" poster="${f.poster}" src="${f.file}"></video>
          <button class="cover" type="button" data-v="v-${f.id}" data-cursor-label="Putar" aria-label="Putar ${f.title}">
            <img src="${f.poster}" alt="" loading="lazy" decoding="async">
            <span class="play">${ICON.play}</span>
            <span class="chip">${f.dur}</span>
            ${f.isNew ? '<span class="new">Baru</span>' : ''}
          </button>
          <div class="spin"><i></i></div>
        </div>
      </div>
      <div class="meta">
        <div class="titlerow"><h3>${f.title}</h3>
          <div class="icons">
            <button class="btn icon" type="button" data-share="${f.id}" aria-label="Bagikan ${f.title}" title="Bagikan">${ICON.share}</button>
            <button class="btn icon" type="button" data-full="v-${f.id}" aria-label="Layar penuh ${f.title}" title="Layar penuh">${ICON.full}</button>
          </div>
        </div>
        <p>${f.text}</p>
        <div class="facts"><span>${f.dur}</span><span>${f.size}</span><span>60 fps</span></div>
        <div class="acts">
          <button class="btn main" type="button" data-play="v-${f.id}">${ICON.play}<span>Putar</span></button>
          <button class="btn like" type="button" data-like="${f.id}" aria-pressed="${isLiked(f.id)}">${ICON.heart}<span>${isLiked(f.id) ? 'Disukai' : 'Suka'}</span><b class="burst"></b></button>
          <a class="btn" href="${f.file}" download="Adinda - ${f.title}.mp4" data-dl="${f.title}">${ICON.down}Unduh</a>
        </div>
      </div>
    </article>`).join('');

  /* ================================================================ loader */
  const loader = $('#loader'), ldbar = $('#ldbar');
  const t0 = performance.now();
  let loaded = 0;
  const waits = [document.fonts ? document.fonts.ready : Promise.resolve(),
                 new Promise(r => { const im = $('.arch-frame img'); if (im.complete) r(); else { im.onload = r; im.onerror = r; } }),
                 new Promise(r => { if (document.readyState === 'complete') r(); else addEventListener('load', r, { once: true }); })];
  waits.forEach(p => p.then(() => { loaded++; ldbar.style.width = (loaded / waits.length * 100) + '%'; }));
  const minShow = still ? 0 : 1500;
  Promise.race([Promise.all(waits), new Promise(r => setTimeout(r, 4500))]).then(() => {
    ldbar.style.width = '100%';
    setTimeout(() => loader.classList.add('done'), Math.max(0, minShow - (performance.now() - t0)));
  });

  /* ================================================================ petals / hearts / sparkles */
  const sky = (() => {
    const cv = $('#petals'), ctx = cv.getContext('2d');
    let W = 0, H = 0, raf = 0, last = performance.now(), parts = [];
    const pinks = ['#ffb7cf', '#ff9cc0', '#f7a8c6', '#ffd0e0', '#f48fb1', '#ffc4d8'];
    const rnd = (a, b) => a + Math.random() * (b - a);
    const petal = (x, y, falling = true) => ({ k: 'petal', x, y, s: rnd(8, 17), vx: rnd(-12, 12), vy: falling ? rnd(26, 58) : rnd(-260, -120),
      rot: rnd(0, 6.28), vr: rnd(-1.6, 1.6), flip: rnd(0, 6.28), vf: rnd(1.5, 3.5), sway: rnd(0, 6.28),
      c: pinks[(Math.random() * pinks.length) | 0], a: rnd(.55, .9), life: 1e9, g: falling ? 0 : 260 });
    function resize() {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(32, Math.max(12, W * H / 48000)));
      parts = parts.filter(p => p.k !== 'petal' || p.life < 1e9).concat(Array.from({ length: n }, () => petal(rnd(0, W), rnd(-H * .6, H))));
    }
    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      const c = Math.cos(p.flip); ctx.scale(c * .85 + .15 * (c < 0 ? -1 : 1), 1);
      const s = p.s;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * .9, -s * .7, s * .75, s * .55, 0, s);
      ctx.bezierCurveTo(-s * .75, s * .55, -s * .9, -s * .7, -s * .18, -s * .92);
      ctx.lineTo(0, -s * .62);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, -s, 0, s);
      g.addColorStop(0, '#fff0f5'); g.addColorStop(1, p.c);
      ctx.fillStyle = g; ctx.globalAlpha = p.a * Math.min(1, p.life);
      ctx.fill(); ctx.restore();
    }
    function drawHeart(p) {
      const s = p.s; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * .3);
      ctx.globalAlpha = p.a * Math.max(0, Math.min(1, p.life)); ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.moveTo(0, s * .3);
      ctx.bezierCurveTo(0, 0, -s * .5, 0, -s * .5, s * .3); ctx.bezierCurveTo(-s * .5, s * .6, 0, s * .78, 0, s);
      ctx.bezierCurveTo(0, s * .78, s * .5, s * .6, s * .5, s * .3); ctx.bezierCurveTo(s * .5, 0, 0, 0, 0, s * .3);
      ctx.fill(); ctx.restore();
    }
    function drawSpark(p) {
      const s = p.s * (.6 + .4 * Math.sin(p.flip)); ctx.save(); ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.a * Math.max(0, Math.min(1, p.life)); ctx.fillStyle = p.c; ctx.beginPath();
      for (let i = 0; i < 8; i++) { const r = i % 2 ? s * .22 : s * .6, a = i * Math.PI / 4; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    function tick(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        if (p.k === 'petal') {
          p.vy += p.g * dt; if (p.g && p.vy > 50) { p.g = 0; p.vy = rnd(30, 60); }
          p.sway += dt * 1.2; p.x += (p.vx + Math.sin(p.sway) * 22) * dt; p.y += p.vy * dt;
          p.rot += p.vr * dt; p.flip += p.vf * dt;
          if (p.life < 1e9) p.life -= dt * .25;
          if (p.y > H + 30 && p.life >= 1e9) { p.y = -20; p.x = rnd(0, W); }
          drawPetal(p);
        } else {
          p.life -= dt / p.dur; p.x += p.vx * dt; p.y += p.vy * dt; p.vy -= 10 * dt; p.flip += dt * 9;
          if (p.k === 'heart') drawHeart(p); else drawSpark(p);
        }
      }
      parts = parts.filter(p => (p.k === 'petal' && p.life >= 1e9) || (p.life > 0 && p.y < H + 60 && p.y > -600));
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }
    function burst(x, y, n, kind) {
      for (let i = 0; i < n; i++) {
        if (kind === 'petal') { const p = petal(x + rnd(-40, 40), y + rnd(-20, 20), false); p.vx = rnd(-220, 220); p.life = 3.5; parts.push(p); }
        else {
          const a = rnd(0, 6.28), sp = rnd(60, 180);
          parts.push({ k: kind, x, y, s: rnd(10, 18), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60, rot: rnd(-1, 1),
                       flip: 0, c: kind === 'heart' ? '#e2457f' : '#ffffff', a: .95, life: 1, dur: rnd(.7, 1.1) });
        }
      }
    }
    function trail(x, y) {
      parts.push({ k: Math.random() < .5 ? 'spark' : 'heart', x, y, s: rnd(7, 12), vx: rnd(-20, 20), vy: rnd(-40, -10),
                   rot: rnd(-1, 1), flip: rnd(0, 6), c: Math.random() < .5 ? '#f48fb1' : '#ffd0e0', a: .9, life: 1, dur: .8 });
    }
    resize();
    addEventListener('resize', resize);
    if (!still) {
      raf = requestAnimationFrame(tick);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(raf); else { last = performance.now(); raf = requestAnimationFrame(tick); }
      });
    }
    return { burst: still ? () => {} : burst, trail: still ? () => {} : trail };
  })();

  /* ================================================================ envelope gate */
  const gate = $('#gate'), openBtn = $('#open');
  function openGate() {
    if (!gate || gate.classList.contains('open')) return;
    gate.classList.add('open');
    const r = openBtn.getBoundingClientRect();
    sky.burst(r.left + r.width / 2, r.top + r.height / 2, 46, 'petal');
    sky.burst(r.left + r.width / 2, r.top + r.height / 2, 16, 'heart');
    setTimeout(() => {
      gate.classList.add('gone');
      body.classList.remove('locked');
      body.classList.add('opened');
      countUp();
      setTimeout(() => gate.remove(), 1000);
    }, still ? 0 : 1500);
  }
  openBtn.addEventListener('click', openGate);
  addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && document.body.contains(gate) && !gate.classList.contains('open') && loader.classList.contains('done')) {
      e.preventDefault(); openGate();
    }
  });

  /* ================================================================ count-up stats */
  function countUp() {
    for (const el of $$('[data-count]')) {
      const to = +el.dataset.count, dur = still ? 0 : 1400, start = performance.now() + 900;
      const step = now => {
        const u = Math.min(1, Math.max(0, (now - start) / Math.max(1, dur)));
        el.textContent = Math.round(to * (1 - Math.pow(1 - u, 3)));
        if (u < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }

  /* ================================================================ reveal on scroll */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !still) {
    const revealObs = new IntersectionObserver(es => {
      for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => revealObs.observe(el));
  } else reveals.forEach(el => el.classList.add('in'));

  /* ================================================================ scroll: progress, header, back-to-top, scrollspy, parallax */
  const prog = $('#progress'), header = $('header'), toTop = $('#toTop'), ring = $('#topRing');
  const archImg = $('.arch-frame img'), tags = $$('.tag[data-depth]');
  const spyLinks = $$('nav a[data-spy]');
  const spyTargets = spyLinks.map(a => document.getElementById(a.dataset.spy));
  let ticking = false;
  function onScroll() {
    const y = scrollY, max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const f = Math.min(1, y / max);
    prog.style.transform = `scaleX(${f})`;
    header.classList.toggle('scrolled', y > 10);
    toTop.classList.toggle('show', y > 600);
    ring.style.strokeDashoffset = 132 * (1 - f);
    if (!still && y < innerHeight * 1.2) {
      archImg.style.transform = `scale(1.06) translateY(${y * .06}px)`;
      tags.forEach(t => { t.style.transform = `translateY(${-y * t.dataset.depth / 100}px)`; });
    }
    let cur = -1;
    spyTargets.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * .45) cur = i; });
    spyLinks.forEach((a, i) => a.setAttribute('aria-current', i === cur ? 'true' : 'false'));
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' }));

  /* ================================================================ videos */
  const vids = $$('video');
  const screenOf = v => v.closest('.screen');
  const labelOf = v => $(`[data-play="${v.id}"] span`);
  const pauseOthers = cur => { for (const v of vids) if (v !== cur && !v.paused) v.pause(); };
  async function start(v) {
    pauseOthers(v);
    v.controls = true; v.muted = false;
    screenOf(v).classList.add('playing', 'loading');
    try { await v.play(); } catch (e) {
      v.muted = true;
      try { await v.play(); toast('Video diputar tanpa suara. Ketuk ikon suara untuk menyalakan.'); }
      catch (e2) { screenOf(v).classList.remove('loading'); }
    }
  }
  for (const v of vids) {
    const s = screenOf(v);
    v.addEventListener('waiting', () => s.classList.add('loading'));
    v.addEventListener('canplay', () => s.classList.remove('loading'));
    v.addEventListener('playing', () => { s.classList.remove('loading'); labelOf(v).textContent = 'Jeda'; });
    v.addEventListener('pause', () => { labelOf(v).textContent = 'Putar'; });
    v.addEventListener('ended', () => { labelOf(v).textContent = 'Putar lagi'; });
    v.addEventListener('play', () => pauseOthers(v));
  }
  if ('IntersectionObserver' in window) {
    const offObs = new IntersectionObserver(es => { for (const e of es) if (!e.isIntersecting && !e.target.paused) e.target.pause(); }, { threshold: .1 });
    vids.forEach(v => offObs.observe(v));
  }

  /* ================================================================ likes, share, download */
  function burst(btn) {
    const b = $('.burst', btn);
    b.innerHTML = Array.from({ length: 10 }, (_, i) => {
      const a = (i / 10) * Math.PI * 2 + Math.random() * .4, r = 34 + Math.random() * 26;
      return `<i style="--x:${Math.cos(a) * r}px;--y:${Math.sin(a) * r - 18}px;animation-delay:${Math.random() * .08}s"></i>`;
    }).join('');
    setTimeout(() => { b.innerHTML = ''; }, 1100);
  }
  function toggleLike(btn) {
    const id = btn.dataset.like, on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', on);
    $('span', btn).textContent = on ? 'Disukai' : 'Suka';
    try { localStorage.setItem(likeKey(id), on ? '1' : '0'); } catch (e) {}
    if (on) {
      burst(btn);
      const r = btn.getBoundingClientRect();
      sky.burst(r.left + 22, r.top + r.height / 2, 14, 'heart');
      toast('Ditambahkan ke favoritmu ♡');
    }
  }
  async function share(title, hash) {
    const url = location.href.split('#')[0] + (hash ? '#' + hash : '');
    const data = { title: title, text: 'Lihat edit video pink untuk Adinda ♡', url };
    try {
      if (navigator.share) { await navigator.share(data); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    try { await navigator.clipboard.writeText(url); toast('Link disalin ♡'); }
    catch (e) { toast(url); }
  }

  document.addEventListener('click', e => {
    const c = e.target.closest('[data-v]');
    if (c) { start(document.getElementById(c.dataset.v)); return; }
    const p = e.target.closest('[data-play]');
    if (p) { const v = document.getElementById(p.dataset.play); if (v.paused) start(v); else v.pause(); return; }
    const l = e.target.closest('[data-like]');
    if (l) { toggleLike(l); return; }
    const sh = e.target.closest('[data-share]');
    if (sh) { const f = films.find(x => x.id === sh.dataset.share); share('Adinda – ' + f.title, 'film-' + f.id); return; }
    const dl = e.target.closest('[data-dl]');
    if (dl) { toast('Mengunduh ' + dl.dataset.dl + '…'); return; }
    const fs = e.target.closest('[data-full]');
    if (fs) {
      const v = document.getElementById(fs.dataset.full);
      if (v.paused) start(v);
      try {
        if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
        else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
      } catch (err) {}
      return;
    }
    const ph = e.target.closest('[data-photo]');
    if (ph) { openLightbox(+ph.dataset.photo); return; }
  });
  $('#sharePage').addEventListener('click', () => share('Adinda in Pink', ''));

  /* ================================================================ lightbox */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  let lbIndex = 0, lastFocus = null;
  function showPhoto(i) {
    lbIndex = (i + photos.length) % photos.length;
    const [f, cap] = photos[lbIndex];
    lbImg.src = 'img/' + f + '.jpg';
    lbImg.alt = 'Foto Adinda, ' + cap;
    lbCap.textContent = cap;
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    showPhoto(i);
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add('show'));
    body.classList.add('locked');
    $('.lb-close', lb).focus();
  }
  function closeLightbox() {
    lb.classList.remove('show');
    body.classList.remove('locked');
    setTimeout(() => { lb.hidden = true; }, still ? 0 : 450);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $('.lb-close', lb).addEventListener('click', closeLightbox);
  $('.lb-nav.prev', lb).addEventListener('click', () => showPhoto(lbIndex - 1));
  $('.lb-nav.next', lb).addEventListener('click', () => showPhoto(lbIndex + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
    else if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
  });
  let sx = 0;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });

  /* ================================================================ desktop niceties: cursor, magnetic, tilt, trail */
  if (fine && !still) {
    root.classList.add('has-cursor');
    const cur = $('#cursor'), dot = $('.dot', cur), ringEl = $('.ring', cur), label = $('em', cur);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, lastTrail = 0;
    addEventListener('pointermove', e => {
      mx = e.clientX; my = e.clientY;
      if (!root.classList.contains('cursor-on')) { rx = mx; ry = my; root.classList.add('cursor-on'); }
      dot.style.transform = `translate(${mx}px,${my}px)`;
      const n = performance.now();
      if (n - lastTrail > 70) { lastTrail = n; sky.trail(mx, my); }
      const lab = e.target.closest('[data-cursor-label]');
      const hov = e.target.closest('a,button,[data-cursor]');
      cur.classList.toggle('label', !!lab);
      cur.classList.toggle('hover', !lab && !!hov);
      if (lab) label.textContent = lab.dataset.cursorLabel;
    }, { passive: true });
    (function follow() {
      rx += (mx - rx) * .18; ry += (my - ry) * .18;
      ringEl.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(follow);
    })();
    document.documentElement.addEventListener('pointerleave', () => root.classList.remove('cursor-on'));

    for (const m of $$('.mag')) {
      m.addEventListener('pointermove', e => {
        const r = m.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        m.style.transform = `translate(${x * .22}px,${y * .3}px)`;
      });
      m.addEventListener('pointerleave', () => { m.style.transform = ''; });
    }
    for (const film of $$('.film')) {
      const b = $('.bezel', film);
      film.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        b.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      });
      film.addEventListener('pointerleave', () => { b.style.transform = ''; });
    }
    const arch = $('#arch');
    arch.addEventListener('pointermove', e => {
      const r = arch.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      $('.arch-frame', arch).style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });
    arch.addEventListener('pointerleave', () => { $('.arch-frame', arch).style.transform = ''; });
  }
})();
