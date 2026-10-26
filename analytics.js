/* Use the existing GA4 property; local previews must not count as visits. */
(() => {
  'use strict';

  if (window.location.hostname !== 'hanshengjiang.github.io') return;

  const measurementId = 'G-B92B2ZVMPX';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(tag);
})();
