# Individual reflection — ROKSHAN TAVINJANA

I built Lanka Explorer as a five-stage front-end project, taking responsibility for the structure, content, data, styling, JavaScript and deployment. The hardest problem was coordinating several asynchronous features on one shared `app.js`: destination cards, weather, currency, maps and stored trip state all need different error handling, and a null selector on one page must never break another. I solved this by giving each page an `init...()` function that exits early when its target element is absent, then keeping `fetch()`, storage and DOM rendering in small, named helpers.

The most satisfying part was making the trip survive a reload with only destination IDs in `localStorage`. Storing IDs instead of whole objects keeps the saved state small and ensures names, coordinates and fees always come from the single JSON source. I also learned why CSS variables named by role are easier to re-theme than colour-named variables when I added dark mode.

If I had more time, I would add server-side enquiry validation, a route optimiser that uses the map coordinates, and automated end-to-end tests for the search, API-failure and trip-budget journeys. I would also replace colour-named variables with `--surface`, `--text` and `--text-on-image` throughout the codebase.
