/* Use the existing GA4 property; local previews must not count as visits. */
(() => {
  'use strict';

  if (window.location.hostname !== 'hanshengjiang.github.io') return;

  const measurementId = 'G-B92B2ZVMPX';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  let lastSectionId = null;
  function trackSection(sectionId) {
    const section = sectionId && document.getElementById(sectionId);
    if (!section || !section.matches('[data-nav-section]') || sectionId === lastSectionId) return;
    lastSectionId = sectionId;
    window.gtag('event', 'section_view', { section_id: sectionId });
  }

  document.addEventListener('site:sectionchange', (event) => {
    trackSection(event.detail.sectionId);
  });

  // Navigation initializes before Analytics; capture that first section too.
  const currentLink = document.querySelector('#site-navigation a[aria-current="location"]');
  if (currentLink) trackSection(currentLink.hash.slice(1));

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);
})();
