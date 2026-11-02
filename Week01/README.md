# Lanka Explorer — Week 01: Project Setup and Page Structure

**Student:** ROKSHAN TAVINJANA  
**Group name:** Lanka Explorer Solo Studio  
**Tagline:** Discover the Pearl of the Indian Ocean  
**Roles:** Project Lead, Content Lead, Data Lead and UI Lead (solo submission)  
**Public hosted site (valid until 2 December 2026):** <https://my-1e9c9ig3oq.brewpage.app/>  
**Arena preview:** <https://8000-ievlemzkk36tsxm86z7uh.e2b.app/>  
**Repository:** <https://github.com/tavinjanarokshan-design/lanka-explorer>  
**GitHub Pages after push:** <https://tavinjanarokshan-design.github.io/lanka-explorer/>

## Project description

Lanka Explorer is a static front-end web app for discovering ten Sri Lankan destinations and planning a trip. This folder is the complete Week 01 snapshot, so it can be opened independently of the later weeks.

## Features in this snapshot

- Five semantic HTML5 pages with a shared header, navigation and footer.
- Ten Sri Lankan destinations in valid `data/destinations.json`, covering Heritage, Beach, Nature and Wildlife.
- Ten local Wikimedia Commons photographs, resized to 1200 px; see `IMAGE-CREDITS.md`.


## How to run

The site uses `fetch()` from Week 03 onward, so it must be served over HTTP rather than opened as a `file://` page.

```bash
cd Week01
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
