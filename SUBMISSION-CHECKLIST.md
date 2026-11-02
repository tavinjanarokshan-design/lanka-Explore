# Submission checklist

## Brief requirements

- [x] One ZIP file containing folders week by week (`Week01` … `Week05`)
- [x] `Hosted Link.txt` — Notepad-compatible text file with the public hosted link, Arena preview and GitHub Pages link
- [x] Uploaded submission screenshot preserved
- [x] Student name (ROKSHAN TAVINJANA) and GitHub username (tavinjanarokshan-design) included in the site, READMEs and documentation
- [x] GitHub links, repository builder, commit history and Pages workflow included

## Week 01

- [x] Five semantic HTML pages with identical header, navigation and footer
- [x] Ten-destination `destinations.json`, valid JSON, exactly three featured places
- [x] Ten local images and meaningful alt text
- [x] `README.md` with name and roles
- [x] Empty `css/style.css` and `js/app.js` linked from every page

## Week 02

- [x] Numbered CSS sections, theme variables and Google Fonts
- [x] Flexbox header, Grid card layouts, styled inner pages and footer
- [x] Media queries at 768 px and 480 px; working mobile menu
- [x] Hover effects, transitions and reduced-motion support
- [x] Specificity answer in `README.md`
- [x] Home screenshots at 375 px and 1280 px

## Week 03

- [x] No hard-coded destination cards remain in dynamic pages
- [x] `fetch()`, `try/catch`, `createElement()` and `innerHTML`
- [x] Search (including descriptions), category filter, three sort modes, result counter and Clear filters
- [x] `details.html?id=...` with not-found handling
- [x] Custom enquiry validation, future-date rule and 500-character message limit
- [x] Mid-range price band and “Free (Free)” repetition fix

## Week 04

- [x] Open-Meteo current weather and 3-day forecast
- [x] Frankfurter USD→LKR conversion with cache and fallback
- [x] Details map and all-destinations map with popups and filter-aware pins
- [x] Loading spinners and friendly API/library failure states
- [x] `API-NOTES.md`

## Week 05 / Final

- [x] Trip planner with `localStorage`, event delegation, traveller count, totals and Clear trip
- [x] Dark/light theme with saved preference and OS fallback
- [x] Add/remove buttons on cards and most-expensive-trip breakdown
- [x] Final README with features, APIs, run steps and links
- [x] `INDIVIDUAL-REFLECTION.md`
- [x] Screenshots of all five pages at 375 px and 1280 px in light and dark mode
- [x] JSON syntax, internal links, image paths, console and responsive checks
- [x] Lighthouse audit recorded in `Week05/README.md` when available
- [x] Public hosted site verified, screenshotted and its expiry documented in `HOSTING-NOTES.md`
- [x] Hosted-site browser smoke test recorded in `HOSTED-SITE-TEST.md`

## Test notes

- All HTML pages share one `h1`, labelled controls, alt text and a skip link.
- JavaScript uses per-page guards, so shared code does not throw on pages where an element is absent.
- API failures are handled individually; USD totals and static destination data remain available offline.
- Relative paths are lowercase and case-consistent for GitHub Pages.
