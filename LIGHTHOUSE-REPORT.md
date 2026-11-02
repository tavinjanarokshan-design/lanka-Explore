# Lighthouse report

Mobile Lighthouse audit (2026-11-02), run against the local hosted site:

| Category | Home | Details |
|---|---:|---:|
| Performance | 95 | 64 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Issues addressed after the first audit:

- Converted every destination photo to 600 px and 1200 px WebP derivatives and kept 600 px/1200 px JPEG fallbacks, then delivered them with responsive `srcset`/`picture` markup.
- Preloaded the Home hero WebP as the LCP image and marked the above-the-fold details image as eager.
- Preloaded the two Google Font files that Lighthouse identified as layout-shift causes; Home CLS dropped to 0.
- Kept the three forecast cards on one horizontally scrollable row on narrow screens and reserved the loaded heights of the details article and weather box.
- Reserved navigation width for the trip counter and added preconnects for the Leaflet CDN, OpenStreetMap tiles and the weather/currency API hosts.
- Deferred the Leaflet and app scripts so the details page can render its semantic shell sooner.

Remaining findings:

- The Details page still shows a font-swap CLS finding under Lighthouse's simulated slow mobile network because the lab guide requires Google Fonts with `display=swap`. On HTTP/2 GitHub Pages/Netlify with cached fonts this is normally much smaller.
- The simple Python preview server does not set long-lived cache headers or gzip compression; GitHub Pages and Netlify handle both automatically. These two server-configuration findings are not code defects.
