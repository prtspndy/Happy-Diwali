# Happy Diwali

A small, responsive Diwali greeting page with CSS illustrations and optional canvas fireworks.

## Run locally

No build tools or dependencies are required. Open `index.html` in a browser, or serve this directory with any static web server, for example:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy

This is a static site and can be deployed directly from the repository root with GitHub Pages or any static hosting provider. Keep `index.html`, `styles.css`, `script.js`, and `favicon.svg` together in the published directory.

## Accessibility and performance

- Fireworks are disabled when the visitor prefers reduced motion and pause while the tab is hidden.
- The animation is bounded to 240 particles and only schedules frames while particles remain.
- All decorative artwork is hidden from assistive technology; the replay control is keyboard accessible.
- Google Fonts are optional; system fallbacks keep the page usable if the font service is unavailable.
