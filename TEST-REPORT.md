# Browser test report

Executed with headless Chromium against the locally hosted Week 05 site on 2 November 2026.

## Interaction checks

| Check | Result | Detail |
|---|---|---|
| Search + category + sort result counter | Pass | Showing 1 of 10 destinations |
| Clear filters restores all ten cards | Pass | Showing 10 of 10 destinations |
| Description search extension | Pass | 2 result(s) for "tea" |
| Card trip button updates label | Pass | ✓ In trip |
| Trip counter updates after card click | Pass | My Trip (4) |
| Open-Meteo weather loads on details page | Pass | weather-now visible |
| Frankfurter LKR fee appears for a paid place | Pass | Entry fee: USD 35 ≈ Rs. 11,621 (Premium) |
| Leaflet details map initialises | Pass |  |
| Details add/remove toggle works | Pass | ✓ In My Trip (click to remove) → Add to My Trip |
| Trip total for 3 places × 2 travellers | Pass | USD 120 |
| Trip LKR total is available | Pass | Rs. 39,844 |
| Event-delegated Remove button works | Pass | 3 → 2 rows |
| Traveller input recalculates total | Pass | USD 100 |
| Empty enquiry shows all validation errors | Pass | 4 error(s) |
| Valid enquiry shows success message | Pass | Thank you, Test Traveller! We will contact you at traveller@example.com within 24 hours. |
| Dark mode toggles and persists after reload | Pass | now=True, after reload=True |
| Mobile menu opens and closes | Pass | opened=True, closed=True |

## Console

Captured console/page errors: **0**.

No red console errors or uncaught page exceptions were observed on the tested pages.

## Screenshots

- Final light/dark desktop/mobile screenshots: 21
- Weekly evidence screenshots: 10
- Uploaded brief: `screenshots/submission-instructions.png`
