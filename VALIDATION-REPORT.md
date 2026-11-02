# Validation report

Validated on 2 November 2026 with the W3C Nu HTML checker, the W3C CSS validator, JSON parsing and `html-validate`.

| Check | Files | Errors | Notes |
|---|---:|---:|---|
| W3C Nu HTML validator | 25 | 0 | 3 informational notes on the dynamic details article |
| W3C CSS validator | 4 | 0 | 34 expected “CSS variables are not statically checked” warnings |
| JSON parse + data-shape checks | 5 | 0 | 10 destinations and exactly 3 featured places in every week |
| `html-validate` (recommended config) | 25 | 0 | `form-dup-name` disabled because grouped checkboxes intentionally share `name="interest"` |

## HTML informational notes

- `Week03/details.html`: Article lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all articles.
- `Week04/details.html`: Article lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all articles.
- `Week05/details.html`: Article lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all articles.

These are advisory messages about the JavaScript-filled `<article id="destination">`; they are not validation errors. After the app loads, the article receives its `<h1>` from `destinations.json`.

## Browser tests

See [`TEST-REPORT.md`](TEST-REPORT.md): 17/17 interaction checks passed and no console errors were captured.
