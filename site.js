/* Progressive navigation: all content and section links work without JavaScript. */
(() => {
  'use strict';

  // Keep old index.html bookmarks working while showing the directory URL.
  if (/^https?:$/.test(window.location.protocol) &&
      window.location.pathname.endsWith('/index.html')) {
    const cleanPath = window.location.pathname.slice(0, -'index.html'.length);
    window.history.replaceState(window.history.state, '',
      cleanPath + window.location.search + window.location.hash);
  }

  const header = document.querySelector('.site-header');
  const navigation = document.getElementById('site-navigation');
  const menuButton = document.getElementById('menu-toggle');
  if (!header || !navigation || !menuButton) return;

  const mobile = window.matchMedia('(max-width: 760px)');
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sections = [...document.querySelectorAll('[data-nav-section]')];
  let framePending = false;
  let headerHeight = 0;

  function fragmentTarget(hash) {
    if (!hash || hash === '#') return null;
    try {
      return document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return null;
    }
  }

  function revealTarget(target) {
    let revealed = false;
    for (let element = target; element; element = element.parentElement) {
      if (element.tagName === 'DETAILS' && !element.open) {
        element.open = true;
        revealed = true;
      }
    }
    return revealed;
  }

  function measureHeader() {
    // An expanded menu must not become the page's permanent scroll offset.
    if (header.classList.contains('is-menu-open')) return;
    const height = Math.ceil(header.getBoundingClientRect().height);
    if (height !== headerHeight) {
      headerHeight = height;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }

  function setMenuOpen(open, restoreFocus = false) {
    const isOpen = mobile.matches && open;
    header.classList.toggle('is-menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) measureHeader();
    if (restoreFocus) menuButton.focus();
  }

  function updateActiveLink() {
    framePending = false;
    measureHeader();
    if (!sections.length) return;

    const activationLine = headerHeight + 32;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= activationLine) active = section;
    }
    // The final section can be too short to reach the activation line.
    if (window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1];
    }

    for (const link of links) {
      if (fragmentTarget(link.hash) === active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  function scheduleUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateActiveLink);
  }

  function restoreFragment() {
    const target = fragmentTarget(window.location.hash);
    if (target && (revealTarget(target) || target.closest('.news-window'))) {
      // Restore deep links after disclosure opening or news-window sizing.
      window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start', behavior: 'instant' }));
    }
    scheduleUpdate();
  }

  header.classList.add('is-enhanced');
  setMenuOpen(false);

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
      setMenuOpen(false, true);
    }
  });

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
        event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
    const target = link && fragmentTarget(link.hash);
    if (!target) return;

    revealTarget(target);
    if (header.contains(link)) setMenuOpen(false);

    // Move keyboard focus with the destination while keeping native link history.
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
    scheduleUpdate();
  });

  mobile.addEventListener('change', () => {
    const focusedLink = navigation.contains(document.activeElement);
    const focusedButton = document.activeElement === menuButton;
    setMenuOpen(false);
    if (mobile.matches && focusedLink) menuButton.focus();
    if (!mobile.matches && focusedButton && links[0]) links[0].focus();
    scheduleUpdate();
  });

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('hashchange', restoreFragment);
  window.addEventListener('load', restoreFragment, { once: true });
  document.addEventListener('toggle', scheduleUpdate, true);
  if ('ResizeObserver' in window) new ResizeObserver(scheduleUpdate).observe(header);

  // Print complete abstracts, then restore the reader's choices.
  let closedBeforePrint = null;
  window.addEventListener('beforeprint', () => {
    if (closedBeforePrint !== null) return;
    closedBeforePrint = [...document.querySelectorAll('details:not([open])')];
    for (const details of closedBeforePrint) details.open = true;
  });
  window.addEventListener('afterprint', () => {
    if (closedBeforePrint === null) return;
    for (const details of closedBeforePrint) details.open = false;
    closedBeforePrint = null;
    scheduleUpdate();
  });

  // Match the original news window to six rows; CSS caps its height on small screens.
  const newsWindow = document.querySelector('.news-window');
  const newsList = newsWindow && newsWindow.querySelector('.news-list');
  if (newsList) {
    const newsSection = newsWindow.closest('#news');
    const newsShell = newsWindow.parentElement;

    function syncNewsScrollbar() {
      const height = newsWindow.clientHeight;
      const total = newsWindow.scrollHeight;
      const thumbHeight = Math.min(height, Math.max(28, height * height / Math.max(total, 1)));
      const thumbTop = (height - thumbHeight) * newsWindow.scrollTop / Math.max(total - height, 1);
      newsShell.style.setProperty('--news-thumb-height', `${thumbHeight}px`);
      newsShell.style.setProperty('--news-thumb-top', `${thumbTop}px`);
    }

    function setNewsActive(active) {
      newsSection.classList.toggle('is-scroll-active', active);
      syncNewsScrollbar();
    }

    function sizeNewsWindow() {
      const items = [...newsList.children];
      const visibleRows = Number(newsWindow.dataset.visibleRows) || 6;
      const last = items[Math.min(visibleRows, items.length) - 1];
      if (!last) return;
      const height = Math.ceil(last.getBoundingClientRect().bottom - newsList.getBoundingClientRect().top);
      newsWindow.style.setProperty('--news-window-height', `${height}px`);
      syncNewsScrollbar();
    }
    newsSection.classList.add('is-scroll-gated');
    newsSection.addEventListener('click', () => setNewsActive(true));
    newsSection.addEventListener('focusin', (event) => {
      if (event.target.matches(':focus-visible')) setNewsActive(true);
    });
    newsSection.addEventListener('focusout', (event) => {
      if (!newsSection.contains(event.relatedTarget)) setNewsActive(false);
    });
    document.addEventListener('pointerdown', (event) => {
      if (!newsSection.contains(event.target)) setNewsActive(false);
    });
    document.addEventListener('focusin', (event) => {
      if (!newsSection.contains(event.target)) setNewsActive(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setNewsActive(false);
    });
    newsWindow.addEventListener('scroll', syncNewsScrollbar, { passive: true });
    sizeNewsWindow();
    if ('ResizeObserver' in window) {
      const newsResizeObserver = new ResizeObserver(sizeNewsWindow);
      newsResizeObserver.observe(newsList);
      newsResizeObserver.observe(newsWindow);
    } else window.addEventListener('resize', sizeNewsWindow);
    if (document.fonts) document.fonts.ready.then(sizeNewsWindow);
  }

  restoreFragment();
  updateActiveLink();
})();
