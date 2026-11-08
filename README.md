# Happy Diwali

A small, responsive Diwali greeting page with CSS illustrations and optional canvas fireworks.

## Live Link

- Link 🖇️ : https://happydiwali-pritesh.vercel.app/

## Deploy

This is a static site and can be deployed directly from the repository root with GitHub Pages or any static hosting provider. Keep `index.html`, `styles.css`, `script.js`, and `favicon.svg` together in the published directory.

## Accessibility and performance

- Fireworks are disabled when the visitor prefers reduced motion and pause while the tab is hidden.
- The animation is bounded to 240 particles and only schedules frames while particles remain.
- All decorative artwork is hidden from assistive technology; the replay control is keyboard accessible.
- Google Fonts are optional; system fallbacks keep the page usable if the font service is unavailable.
