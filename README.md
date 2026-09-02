# Dive Bar Finder Website

SEO-focused landing website and search-intent guides for the [Dive Bar Finder iPhone app](https://apps.apple.com/gb/app/dive-bar-finder/id6758267440).

## Site

Production: https://divebarfinder.info/

Featured guides:

- [Dive bar guides across Europe](https://divebarfinder.info/guides/europe.html)
- [Dive bar guides across North America](https://divebarfinder.info/guides/north-america.html)
- [Rock and metal bars in London](https://divebarfinder.info/guides/rock-metal-bars-london.html)
- [Punk, metal and goth places in Berlin](https://divebarfinder.info/guides/alternative-bars-berlin.html)
- [Punk, rock and metal bars in Montréal](https://divebarfinder.info/guides/punk-rock-bars-montreal.html)
- [Dive bars and alternative nightlife in Manchester](https://divebarfinder.info/guides/dive-bars-manchester.html)
- [Dive bars and rock pubs in Glasgow](https://divebarfinder.info/guides/dive-bars-glasgow.html)
- [Dive bars and alternative pubs in Bristol](https://divebarfinder.info/guides/dive-bars-bristol.html)
- [Dive bars and rock pubs in Liverpool](https://divebarfinder.info/guides/dive-bars-liverpool.html)
- [Information for bars and venues](https://divebarfinder.info/venues.html)

## Structure

- `index.html` — conversion-focused landing page
- `support.html`, `privacy.html` and `terms.html` — public App Store support and legal pages
- `guides/` — keyword-targeted editorial guides
- `assets/app-store/` — icon and screenshots from the App Store listing
- `app.md` — app facts, positioning and keyword research
- `sitemap.xml` and `robots.txt` — search-engine discovery files
- `seo/page-manifest.json`: reviewed contract for new indexable page cohorts
- `seo/expansion-cities.mjs`: structured local facts for the managed international city cohort
- `tests/seo.test.mjs`: metadata, sitemap, structured data and link checks

The site is static HTML, CSS and JavaScript with no build step.
