# Public hosted-site smoke test

**Tested URL:** <https://my-1e9c9ig3oq.brewpage.app/>  
**Expiry:** 2 December 2026  
**Result:** 19/19 checks passed  
**Tool:** headless Chromium / Playwright at 1280 × 800 px

The public link resolves to the final `Week05/` site deployed as a static ZIP. The free host injects a small BrewPage badge and expiry notice; those are hosting overlays, not part of the project source.

## Checks

| Check | Result | Detail |
|---|---|---|
| Public hosted Home page loads | PASS | Lanka Explorer \| Home |
| Three featured cards render | PASS | 3 cards |
| Global navigation has all core links | PASS | 4 links |
| Public hosted screenshot saved | PASS |  |
| Destination JSON fetch populates all ten cards | PASS | 10 cards |
| Details page resolves ?id=1 from JSON | PASS | Sigiriya Rock Fortress |
| Open-Meteo weather appears on the public host | PASS | 🌦️23°C |
| Frankfurter USD→LKR conversion appears | PASS | Entry fee: USD 35 ≈ Rs. 11,621 (Premium) |
| Leaflet map container initialises | PASS |  |
| OpenStreetMap tiles load on the public host | PASS | 15 loaded tiles |
| Add-to-trip toggle works on the public host | PASS | Add to My Trip → ✓ In My Trip (click to remove) |
| Trip planner persists across hosted pages | PASS | USD 35 |
| Trip planner shows LKR total | PASS | Rs. 11,621 |
| Enquiry validation works on the public host | PASS | 4 errors |
| About page advertises the public hosted URL | PASS |  |
| About page shows the configured student name | PASS | ROKSHAN TAVINJANA |
| About page shows the configured GitHub repository | PASS | tavinjanarokshan-design |
| No same-origin HTTP 4xx/5xx responses | PASS | 0 bad responses |
| No console/page errors on the public host | PASS | 0 errors |

## Console

Captured console/page errors: **0**.

No red console errors or uncaught page exceptions were observed.

## Failed same-origin responses

Count: **0**.

No same-origin 4xx or 5xx responses were observed.

## Evidence

- `screenshots/final/public-hosted-site-1280.jpg` — Home page captured from the public URL.
