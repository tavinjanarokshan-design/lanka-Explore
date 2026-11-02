# Lanka Explorer — Complete Final Submission

**Student:** ROKSHAN TAVINJANA  
**Prepared:** 2 November 2026  
**Public hosted site:** <https://my-1e9c9ig3oq.brewpage.app/> (valid until 2 December 2026)  
**Arena preview:** <https://8000-ievlemzkk36tsxm86z7uh.e2b.app/>  
**Repository:** <https://github.com/tavinjanarokshan-design/lanka-explorer>  
**GitHub Pages after push:** <https://tavinjanarokshan-design.github.io/lanka-explorer/>

This folder is the complete mini-project submission requested by the brief: five **week-by-week folders**, a **Notepad text file with the hosted link**, the uploaded submission screenshot, fresh screenshots, GitHub deployment files and all supporting documentation.

## Submission contents

| Item | Purpose |
|---|---|
| `Week01/` – `Week05/` | Complete, independently runnable snapshot for each lab week |
| `Hosted Link.txt` | Required Notepad file with the public hosted link, Arena preview and GitHub Pages link |
| `HOSTING-NOTES.md` | Public hosting expiry, deployment contents and permanent-link instructions |
| `START-HERE.html` | Visual cover page with links to every part of the submission |
| `screenshots/` | Uploaded submission screenshot, weekly screenshots, final light/dark screenshots at 375 px and 1280 px, and a screenshot of the public hosted site |
| `README.md` | This package overview |
| `API-NOTES.md` | Week 04 API endpoints and documentation notes |
| `INDIVIDUAL-REFLECTION.md` | Short individual reflection |
| `IMAGE-CREDITS.md` | Authors, licences and source URLs for all ten photographs |
| `SUBMISSION-CHECKLIST.md` | Week-by-week and final checklist |
| `VALIDATION-REPORT.md` / `TEST-REPORT.md` | W3C validation and browser interaction results |
| `HOSTED-SITE-TEST.md` | Browser smoke test of the live public hosted link |
| `LIGHTHOUSE-REPORT.md` | Mobile Lighthouse scores and the performance fixes |
| `GITHUB-SETUP.md` | Exact steps to push and publish with GitHub Pages |
| `prepare-github-repo.sh` | Builds a five-commit local Git repository and adds the GitHub remote |
| `.github/workflows/deploy.yml` | GitHub Actions workflow that publishes `Week05/` |
| `reference/lab-guides/` | The five supplied PDF lab guides |
| `CHANGE-NAME.md` / `CHANGE-NAME-SINHALA.md` / `set-name.py` | English and Sinhala guides plus the one-command replacement for the current name and GitHub username |
| `STUDENT-DETAILS.txt` | Name, student ID and repository details |
| `git-log.txt` | Evidence of the five weekly Git commits |

## Run the final site

```bash
cd Week05
python3 -m http.server 5500
```

Open `http://127.0.0.1:5500/`. A web server is required because the app uses `fetch('data/destinations.json')`; opening `index.html` with `file://` will not load the JSON.

## GitHub connection

The package includes visible repository links in the site footer and About page, a five-week commit history builder, and a GitHub Pages deployment workflow. Run `./prepare-github-repo.sh tavinjanarokshan-design`, create the public repository on GitHub, then push. Full instructions are in [`GITHUB-SETUP.md`](GITHUB-SETUP.md).

## Student identity

The project is labelled for **ROKSHAN TAVINJANA** with GitHub username `tavinjanarokshan-design` and GitHub profile name **ROKSHAN TAVINJANA UDUGAMASOORIYA**. To change any of these, run `python3 set-name.py "<FULL NAME>" <GITHUB_USERNAME>` from this folder and rebuild the ZIP. Add your student ID in `STUDENT-DETAILS.txt` if your lecturer requires it.

## Accessibility and credits

- All destination photos are freely licensed Wikimedia Commons files; see [`IMAGE-CREDITS.md`](IMAGE-CREDITS.md).
- OpenStreetMap attribution is visible on both Leaflet maps.
- External APIs: Open-Meteo, Frankfurter and OpenStreetMap/Leaflet; see [`API-NOTES.md`](API-NOTES.md).
