/* ==========================================================
   NAMNA — LAYOUT OPTION 3: MINIMALIST / FOCUSED MODERN MEDIA
   Scripts for index3.html only (does not replace scripts.js).
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
   OPTION 3 — Minimal
   ========================================================== */
function initLayout() {

  /* Header hides on scroll down, returns on scroll up */
  const header = document.getElementById('siteHeader');
  const panel = document.getElementById('mobileNavPanel');
  if (header) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const menuOpen = panel && panel.classList.contains('open');
      header.classList.toggle('is-hidden', y > lastY && y > 240 && !menuOpen);
      lastY = y;
    }, { passive: true });
  }

  /* "By Section" tabs — accessible tablist (WP: one WP_Query per panel) */
  const tablist = document.querySelector('.tabs[role="tablist"]');
  if (tablist) {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    const select = tab => {
      tabs.forEach(t => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) { panel.hidden = !on; panel.classList.toggle('is-active', on); }
      });
    };
    tabs.forEach(t => t.addEventListener('click', () => select(t)));
    tablist.addEventListener('keydown', e => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next); next.focus(); }
    });
  }
}
