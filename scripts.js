/* ==========================================================
   NAMNA — SITE SCRIPTS
   Shared across index.html (front page) and post.html
   (single post). Sections are labeled with the WordPress
   template file they will eventually map to.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     GLOBAL — Mobile Hamburger Menu
     (Present on every page — WP: header.php, enqueued site-wide)
     ========================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavPanel = document.getElementById('mobileNavPanel');

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.toggle('open');
      hamburgerBtn.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu after a link is tapped
    mobileNavPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavPanel.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu automatically if window is resized back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 820) {
        mobileNavPanel.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================
     GLOBAL — Sticky Header Shadow
     (Present on every page — WP: header.php. Adds a subtle
     drop-shadow to header.main once the page has scrolled past
     the dark top bar, so the shadow only shows while the nav is
     actually "stuck" to the viewport top.)
     ========================================================== */
  const siteHeader = document.querySelector('header.main');

  if (siteHeader) {
    const toggleStuckState = () => {
      siteHeader.classList.toggle('is-stuck', window.scrollY > 4);
    };

    toggleStuckState();
    window.addEventListener('scroll', toggleStuckState, { passive: true });
  }

  /* ==========================================================
     HOME TEMPLATE ONLY — Hero Slider
     (WP: front-page.php — script exits safely if #heroSlider
     isn't present, e.g. on single.php)
     ========================================================== */
  const heroSlider = document.getElementById('heroSlider');

  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    // Right-rail thumbnails double as slide navigation — WP: each item
    // maps to a queried post; data-target-slide keeps it in sync with
    // the corresponding hero-slide index.
    const navItems = document.querySelectorAll('#heroNavList .hero-nav-item');
    const trendingRail = document.getElementById('trendingRail');

    let currentSlide = 0;
    const slideCount = slides.length;
    const AUTOPLAY_DELAY = 5000;
    let autoplayTimer = null;

    // Contextual hero CTA copy, keyed by each slide's category (its
    // .eyebrow text, lowercased) — WP: this would key off post_category
    // once slides are dynamic. Falls back to a sensible default for any
    // category not explicitly mapped (e.g. Events).
    const CTA_BY_CATEGORY = {
      style: 'Read the Story',
      fashion: 'Read the Story',
      travel: 'Discover Destination',
      places: 'Discover Destination',
      table: 'View the Menu',
      dining: 'View the Menu',
      events: 'See the Highlights',
      people: 'Read Interview',
      interviews: 'Read Interview',
      'the view': 'Full Article',
      opinion: 'Full Article',
      'the cover': 'Read the Full Story'
    };
    const DEFAULT_CTA = 'Full Article';

    slides.forEach(slide => {
      const eyebrowEl = slide.querySelector('.eyebrow');
      const ctaTextEl = slide.querySelector('.hero-cta .cta-text');
      if (eyebrowEl && ctaTextEl) {
        const category = eyebrowEl.textContent.trim().toLowerCase();
        ctaTextEl.textContent = CTA_BY_CATEGORY[category] || DEFAULT_CTA;
      }
    });

    // Build pagination dots to match the actual slide count
    slides.forEach((slide, i) => {
      const dot = document.createElement('span');
      dot.dataset.dot = i;
      dot.textContent = String(i + 1).padStart(2, '0');
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('span');

    function goToSlide(index) {
      currentSlide = (index + slideCount) % slideCount;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
      navItems.forEach((item, i) => item.classList.toggle('active', i === currentSlide));
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); });
    });

    // Clicking the thumbnail or headline link inside a rail item is a
    // direct read — let the browser navigate to post.html normally.
    // Clicking anywhere else on the card (its background) instead swaps
    // the active hero slide and restarts the autoplay countdown.
    // Hovering previews the slide without derailing the loop (autoplay
    // simply pauses for as long as the pointer stays).
    navItems.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
          return; // allow direct navigation to post.html
        }
        goToSlide(i);
        startAutoplay();
      });
      item.addEventListener('mouseenter', () => goToSlide(i));
    });

    // Pause autoplay while hovering the hero or the rail, resume on leave
    heroSlider.addEventListener('mouseenter', stopAutoplay);
    heroSlider.addEventListener('mouseleave', startAutoplay);
    if (trendingRail) {
      trendingRail.addEventListener('mouseenter', stopAutoplay);
      trendingRail.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
  }

  /* ==========================================================
     CATEGORY TEMPLATE ONLY — Load More (batch reveal)
     (WP: archive.php / category.php — exits safely if
     #categoryGrid isn't present, e.g. on front-page.php or single.php)
     ========================================================== */
  const categoryGrid = document.getElementById('categoryGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  if (categoryGrid && loadMoreBtn) {
    const BATCH_SIZE = 3;

    loadMoreBtn.addEventListener('click', () => {
      const hiddenPosts = categoryGrid.querySelectorAll('.grid-post.is-hidden');

      hiddenPosts.forEach((post, i) => {
        if (i < BATCH_SIZE) post.classList.remove('is-hidden');
      });

      // Hide the button once every post has been revealed
      if (categoryGrid.querySelectorAll('.grid-post.is-hidden').length === 0) {
        loadMoreBtn.classList.add('is-hidden');
      }
    });
  }

  /* ==========================================================
     ADVERTISE TEMPLATE ONLY — Inquiry Form Validation
     (WP: page-advertise.php — exits safely if #advertiseForm
     isn't present on other templates)
     ========================================================== */
  const advertiseForm = document.getElementById('advertiseForm');

  if (advertiseForm) {
    advertiseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredFields = advertiseForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('field-error');
        } else {
          field.classList.remove('field-error');
        }
      });

      if (!isValid) return;

      const formContainer = advertiseForm.parentElement;
      formContainer.innerHTML = `
        <div class="ad-form-success">
          <span>Asante!</span>
          Your inquiry has been received. Our team will get back to you with our full KES rate card within 24 hours.
        </div>
      `;
    });

    // Clear the error state as soon as a required field is filled in
    advertiseForm.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) field.classList.remove('field-error');
      });
    });
  }

});
