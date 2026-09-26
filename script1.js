/* ==========================================================
   NAMNA — LAYOUT OPTION 1: MODERN MAGAZINE / EDITORIAL GRID
   Scripts for index1.html only (does not replace scripts.js).
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
   OPTION 1 — Editorial Grid
   ========================================================== */
function initLayout() {

  /* Dateline in the top bar, e.g. "Saturday, 26 September 2026" */
  const dateline = document.getElementById('dateline');
  if (dateline) {
    dateline.textContent = new Date().toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  /* Trending ticker — duplicate the items once so the CSS
     translateX(-50%) loop is seamless (WP: output one loop, JS clones). */
  const track = document.getElementById('tickerTrack');
  if (track) {
    Array.from(track.children).forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.tabIndex = -1;
      track.appendChild(clone);
    });
  }
}
