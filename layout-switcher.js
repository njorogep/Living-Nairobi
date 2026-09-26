/* ==========================================================
   NAMNA — LAYOUT SWITCHER  (design review only)
   Self-contained: injects its own styles + markup, so each page
   needs just one line:  <script src="layout-switcher.js" defer></script>
   To remove before go-live: delete that line and this file.
   ========================================================== */
(function () {
  'use strict';

  var LAYOUTS = [
    { n: 1, file: 'index.html',  name: 'Current',        note: 'Slider + Most Read' },
    { n: 2, file: 'index1.html', name: 'Editorial Grid', note: 'Magazine grid + sidebar' },
    { n: 3, file: 'index2.html', name: 'Feature-Heavy',  note: 'Full-width hero + mix' },
    { n: 4, file: 'index3.html', name: 'Minimalist',     note: 'Clean, focused, airy' }
  ];

  // Which layout is this page? (Vercel may serve "/" or "/index" for index.html)
  var path = location.pathname.split('/').pop() || 'index.html';
  if (path.indexOf('.') === -1) path += '.html';
  var current = LAYOUTS.filter(function (l) { return l.file === path; })[0] || LAYOUTS[0];

  var KEY = 'namnaSwitcherOpen';
  var store = {
    get: function () { try { return sessionStorage.getItem(KEY); } catch (e) { return null; } },
    set: function (v) { try { sessionStorage.setItem(KEY, v); } catch (e) {} }
  };

  var css = '' +
    '.nls{position:fixed;left:0;top:50%;z-index:2147483000;display:flex;align-items:center;' +
      'transform:translate(calc(-100% + 44px),-50%);transition:transform .45s cubic-bezier(.2,.8,.2,1);' +
      'font-family:"Jost",system-ui,sans-serif;-webkit-font-smoothing:antialiased;}' +
    '.nls.is-open{transform:translate(0,-50%);}' +
    '.nls-panel{background:#111;color:#fff;width:268px;padding:22px 18px 18px;border:1px solid #b8934f;border-left:none;' +
      'box-shadow:0 18px 50px rgba(0,0,0,.35);}' +
    '.nls-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px;}' +
    '.nls-title{font-family:"Playfair Display",Georgia,serif;font-size:20px;color:#e8c98c;letter-spacing:.02em;}' +
    '.nls-hint{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#8d8a83;}' +
    '.nls-list{display:grid;gap:8px;margin:0;padding:0;list-style:none;}' +
    '.nls-item{display:grid;grid-template-columns:44px 1fr;align-items:center;gap:12px;padding:8px;border:1px solid #2c2c2c;' +
      'color:#fff;text-decoration:none;transition:border-color .2s,background .2s;}' +
    '.nls-item:hover{border-color:#b8934f;background:#1b1b1b;}' +
    '.nls-num{width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:1px solid #b8934f;' +
      'font-family:"Playfair Display",Georgia,serif;font-size:22px;color:#e8c98c;}' +
    '.nls-name{display:block;font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;}' +
    '.nls-note{display:block;font-size:11.5px;color:#9a968d;margin-top:2px;}' +
    '.nls-item.is-current{background:#b8934f;border-color:#b8934f;color:#111;cursor:default;}' +
    '.nls-item.is-current .nls-num{background:#111;border-color:#111;color:#e8c98c;}' +
    '.nls-item.is-current .nls-note{color:#3a2f1c;}' +
    '.nls-tab{align-self:center;width:44px;padding:16px 0;background:#b8934f;color:#111;border:none;cursor:pointer;' +
      'display:flex;flex-direction:column;align-items:center;gap:10px;box-shadow:4px 8px 24px rgba(0,0,0,.28);font-family:inherit;}' +
    '.nls-tab-label{writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;}' +
    '.nls-tab-num{width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:#111;color:#e8c98c;' +
      'font-family:"Playfair Display",Georgia,serif;font-size:16px;}' +
    '.nls-tab-arrow{font-size:14px;line-height:1;transition:transform .3s;}' +
    '.nls.is-open .nls-tab-arrow{transform:rotate(180deg);}' +
    '.nls-tab:focus-visible,.nls-item:focus-visible{outline:2px solid #e8c98c;outline-offset:2px;}' +
    '.nls.is-peek{animation:nlsPeek 2.4s ease 0.6s 1;}' +
    '@keyframes nlsPeek{0%,100%{transform:translate(calc(-100% + 44px),-50%);}25%,70%{transform:translate(calc(-100% + 96px),-50%);}}' +
    /* Phones: tab sits lower (clear of headers/sliders) and panel fills most of the width */
    '@media (max-width:600px){' +
      '.nls{top:auto;bottom:88px;transform:translate(calc(-100% + 40px),0);}' +
      '.nls.is-open{transform:translate(0,0);}' +
      '@keyframes nlsPeek{0%,100%{transform:translate(calc(-100% + 40px),0);}25%,70%{transform:translate(calc(-100% + 90px),0);}}' +
      '.nls-panel{width:min(78vw,300px);padding:18px 14px 14px;}' +
      '.nls-tab{width:40px;padding:12px 0;}' +
      '.nls-hint{display:none;}' +
    '}' +
    '.nls-scrim{position:fixed;inset:0;z-index:2147482999;background:rgba(0,0,0,.35);opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;}' +
    '.nls-scrim.is-open{opacity:1;visibility:visible;}' +
    '@media (min-width:601px){.nls-scrim{display:none;}}' +
    '@media (prefers-reduced-motion:reduce){.nls,.nls-tab-arrow{transition:none;}.nls.is-peek{animation:none;}}';

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var items = LAYOUTS.map(function (l) {
      var isCur = l === current;
      return '<li><a class="nls-item' + (isCur ? ' is-current' : '') + '" href="' + l.file + '"' +
        (isCur ? ' aria-current="page"' : '') + '>' +
        '<span class="nls-num">' + l.n + '</span>' +
        '<span><span class="nls-name">' + l.name + '</span><span class="nls-note">' + l.note + '</span></span></a></li>';
    }).join('');

    var wrap = document.createElement('div');
    wrap.className = 'nls';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Layout switcher');
    wrap.innerHTML =
      '<div class="nls-panel" id="nlsPanel">' +
        '<div class="nls-head"><span class="nls-title">Layout</span><span class="nls-hint">Keys 1&ndash;4</span></div>' +
        '<ul class="nls-list">' + items + '</ul>' +
      '</div>' +
      '<button class="nls-tab" type="button" aria-controls="nlsPanel" aria-expanded="false">' +
        '<span class="nls-tab-num">' + current.n + '</span>' +
        '<span class="nls-tab-label">Layout</span>' +
        '<span class="nls-tab-arrow" aria-hidden="true">&rsaquo;</span>' +
      '</button>';

    var scrim = document.createElement('div');
    scrim.className = 'nls-scrim';

    document.body.appendChild(scrim);
    document.body.appendChild(wrap);

    var tab = wrap.querySelector('.nls-tab');
    var links = wrap.querySelectorAll('.nls-item');

    function setOpen(open) {
      wrap.classList.toggle('is-open', open);
      scrim.classList.toggle('is-open', open);
      tab.setAttribute('aria-expanded', open ? 'true' : 'false');
      links.forEach(function (a) { a.tabIndex = open ? 0 : -1; });
      store.set(open ? '1' : '0');
    }

    tab.addEventListener('click', function () { setOpen(!wrap.classList.contains('is-open')); });
    scrim.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && wrap.classList.contains('is-open')) { setOpen(false); tab.focus(); return; }
      var t = e.target;
      if (e.ctrlKey || e.metaKey || e.altKey || (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))) return;
      var l = LAYOUTS[parseInt(e.key, 10) - 1];
      if (l && l !== current) location.href = l.file;
    });
    // Clicking the current layout just closes the panel
    wrap.querySelector('.nls-item.is-current').addEventListener('click', function (e) { e.preventDefault(); setOpen(false); });

    // Stay open while flicking between layouts; otherwise give a gentle peek
    if (store.get() === '1') {
      wrap.style.transition = 'none';
      setOpen(true);
      requestAnimationFrame(function () { requestAnimationFrame(function () { wrap.style.transition = ''; }); });
    } else {
      setOpen(false);
      wrap.classList.add('is-peek');
      wrap.addEventListener('animationend', function () { wrap.classList.remove('is-peek'); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
