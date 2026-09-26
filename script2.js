/* ==========================================================
   NAMNA — LAYOUT OPTION 2: FEATURE-HEAVY / FEATURED HERO & GRID MIX
   Scripts for index2.html only (does not replace scripts.js).
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     GLOBAL — Mobile hamburger menu (WP: header.php)
     ========================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavPanel = document.getElementById('mobileNavPanel');

  const closeMenu = () => {
    if (!mobileNavPanel) return;
    mobileNavPanel.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  };

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
    mobileNavPanel.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
  }

  /* ==========================================================
     GLOBAL — Sticky header state (adds .is-stuck once scrolled)
     ========================================================== */
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    // A zero-height sentinel marks the header's natural position (a sticky
    // element's own offsetTop moves with it once it sticks).
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    siteHeader.parentNode.insertBefore(sentinel, siteHeader);
    const stickPoint = () => sentinel.offsetTop + 4;
    const toggleStuck = () => siteHeader.classList.toggle('is-stuck', window.scrollY > stickPoint());
    toggleStuck();
    window.addEventListener('scroll', toggleStuck, { passive: true });
  }

  /* ==========================================================
     GLOBAL — Search overlay (WP: get_search_form())
     ========================================================== */
  const overlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const closeSearch = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  if (overlay) {
    document.querySelectorAll('.js-search-open').forEach(btn => btn.addEventListener('click', () => {
      closeMenu();
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => searchInput && searchInput.focus(), 50);
    }));
    document.getElementById('searchClose').addEventListener('click', closeSearch);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeSearch(); closeMenu(); }
    });
  }

  /* ==========================================================
     GLOBAL — Newsletter forms (front-end check only;
     WP: hand off to Mailchimp / newsletter plugin)
     ========================================================== */
  document.querySelectorAll('.js-newsletter').forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const note = form.querySelector('.form-note');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      form.classList.toggle('is-error', !ok);
      note.textContent = ok ? 'Asante! You’re on the list.' : 'Please enter a valid email address.';
      if (ok) input.value = '';
    });
  });

  /* ==========================================================
     LAYOUT-SPECIFIC
     ========================================================== */
  initLayout();
});

/* ==========================================================
   OPTION 2 — Featured Hero slider with story tabs
   (WP: front-page.php — exits safely if #heroSlider is absent)
   ========================================================== */
function initLayout() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const tabs = document.querySelectorAll('#slideTabs .slide-tab');
  const progress = document.getElementById('sliderProgress');
  const DELAY = 6000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = null;

  function restartProgress() {
    if (!progress || reduceMotion) return;
    progress.style.transition = 'none';
    progress.style.width = '0';
    void progress.offsetWidth; // reflow so the transition restarts
    progress.style.transition = `width ${DELAY}ms linear`;
    progress.style.width = '100%';
  }
  function freezeProgress() {
    if (!progress) return;
    const w = getComputedStyle(progress).width;
    progress.style.transition = 'none';
    progress.style.width = w;
  }

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === current));
    tabs.forEach((t, n) => {
      t.classList.toggle('is-active', n === current);
      t.setAttribute('aria-selected', n === current ? 'true' : 'false');
    });
  }
  function start() {
    stop();
    if (reduceMotion) return;
    restartProgress();
    timer = setInterval(() => { goTo(current + 1); restartProgress(); }, DELAY);
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => { goTo(i); start(); });
  });

  // Clicking the slide image area opens the story
  slides.forEach(slide => {
    slide.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      const link = slide.querySelector('a');
      if (link) window.location.href = link.href;
    });
    slide.style.cursor = 'pointer';
  });

  // Pause while hovering
  slider.addEventListener('mouseenter', () => { stop(); freezeProgress(); });
  slider.addEventListener('mouseleave', start);

  // Swipe on touch devices
  let x0 = null;
  slider.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); start(); }
    x0 = null;
  });

  // Keyboard arrows when the tabs have focus
  document.getElementById('slideTabs').addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    goTo(current + (e.key === 'ArrowRight' ? 1 : -1));
    tabs[current].focus();
    start();
  });

  start();
}
