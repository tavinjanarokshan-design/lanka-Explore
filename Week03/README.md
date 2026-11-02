# Lanka Explorer — Week 03: JavaScript and Dynamic Content

**Student:** ROKSHAN TAVINJANA  
**Group name:** Lanka Explorer Solo Studio  
**Tagline:** Discover the Pearl of the Indian Ocean  
**Roles:** Project Lead, Content Lead, Data Lead and UI Lead (solo submission)  
**Public hosted site (valid until 2 December 2026):** <https://my-1e9c9ig3oq.brewpage.app/>  
**Arena preview:** <https://8000-ievlemzkk36tsxm86z7uh.e2b.app/>  
**Repository:** <https://github.com/tavinjanarokshan-design/lanka-explorer>  
**GitHub Pages after push:** <https://tavinjanarokshan-design.github.io/lanka-explorer/>

## Project description

Lanka Explorer is a static front-end web app for discovering ten Sri Lankan destinations and planning a trip. This folder is the complete Week 03 snapshot, so it can be opened independently of the later weeks.

## Features in this snapshot

- Five semantic HTML5 pages with a shared header, navigation and footer.
- Ten Sri Lankan destinations in valid `data/destinations.json`, covering Heritage, Beach, Nature and Wildlife.
- Ten local Wikimedia Commons photographs, resized to 1200 px; see `IMAGE-CREDITS.md`.
- Responsive theme built with CSS variables, Flexbox, CSS Grid, media queries and transitions.
- Working mobile menu at 768 px and below.
- Cards generated from JSON with `fetch()`, `createElement()` and `innerHTML`.
- Live search (name, district, description and category), category filter, three sort modes, a result counter and Clear filters.
- Details page driven by `details.html?id=...`, with friendly “not found” handling.
- Custom enquiry validation with all errors shown together, a future-date rule and a 500-character message limit.


## CSS specificity reflection (Week 02)

`#enquiry-form fieldset label` is more specific than both `fieldset label` and `#enquiry-form label`: it contains one ID, one element and one type in the compound selector, so it wins when all three rules target the same label. The rule resets the heavier weight of the general form labels only inside the fieldset, while keeping the heading labels bold. If written as `fieldset label`, the ID-based `#enquiry-form label { font-weight: 600 }` rule would win and the checkbox labels would incorrectly stay bold.

## How to run

The site uses `fetch()` from Week 03 onward, so it must be served over HTTP rather than opened as a `file://` page.

```bash
cd Week03
python3 -m http.server 5500
```

Then open `http://127.0.0.1:5500/`. In VS Code, right-click `index.html` and choose **Open with Live Server**.

## Files

- `index.html`, `destinations.html`, `details.html`, `trip.html`, `about.html`
- `css/style.css`, `js/app.js`
- `data/destinations.json`
- `images/` — ten destination photos plus a favicon
- `IMAGE-CREDITS.md` — authors, licences and source links
- `screenshots/` — evidence for this week


## Data note

Entry fees are indicative non-SAARC foreign-adult prices checked against 2026 tourism references; they exclude jeep hire, taxes and guide charges. Always verify at the official counter before travel. Sources: <https://slvoyo.com/complete-guide-to-sri-lanka-entrance-fees-for-foreign-tourists-2026-updated-prices/> and <https://ouratravel.com/sri-lanka-tourist-attractions-guide/>.
