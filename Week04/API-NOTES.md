# API notes — Week 04

| Service | Endpoint used | What the app extracts | Documentation note |
|---|---|---|---|
| Open-Meteo | `https://api.open-meteo.com/v1/forecast` with `latitude`, `longitude`, `current=...`, `daily=...`, `timezone=Asia%2FColombo` and `forecast_days=3` | `current.temperature_2m`, humidity, wind, WMO `weather_code`, and four parallel `daily` arrays | No API key is needed for non-commercial use. The `daily` arrays are parallel: index `0` of each array belongs to the first date. Numeric WMO codes must be translated into words. |
| Frankfurter | `https://api.frankfurter.dev/v2/rate/usd/lkr` | `rate`, the number of LKR per 1 USD | The v2 rate endpoint returns a small object with `date`, `base`, `quote` and `rate`; rates are published on business days. The result is cached in memory so the page makes at most one request per load. |
| Exchange-rate fallback | `https://open.er-api.com/v6/latest/USD` | `rates.LKR` | Used only if Frankfurter is unavailable. USD totals remain usable if both services fail. |
| Leaflet + OpenStreetMap | Leaflet 1.9.4 from unpkg; tiles from `https://tile.openstreetmap.org/{z}/{x}/{y}.png` | Map objects, markers and popups | Leaflet needs a fixed-height container and `L` must load before `app.js`. OpenStreetMap requires visible attribution, which is included in `addBaseLayer()`. |

## What I learned

- A query string is built from `key=value` pairs joined with `&`; `/` in a value such as `Asia/Colombo` must be URL-encoded as `%2F`.
- API responses are often nested, and a small change such as `forecast` → `forecas` produces a 404. Checking both `response.ok` and the shape of the parsed JSON prevents uncaught errors.
- Third-party libraries can fail independently of the app. `typeof L === 'undefined'` lets the map show a friendly message instead of stopping the rest of the script.
- Every long-running request needs a loading state, and each failure should be handled in the way that preserves the most useful information: weather shows an error, while a failed currency conversion quietly leaves the USD price visible.
