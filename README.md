# sherin-sef-ai.github.io

Personal site for **Sherin Joseph Roy**: computer vision, on-device autonomy and vehicle
reverse engineering.

Live at <https://sherin-sef-ai.github.io/>

## Stack

Static HTML, one stylesheet, one script. No build step, no dependencies, no framework.
Deployed by GitHub Pages from `main` at the repository root.

```
index.html              single-page portfolio (hero, focus, 24-card work grid,
                        research, field notes, about, contact)
work/*.html             case studies: CanLab, LabeloxAV, Sentigon, deepgent
research/sef.html       Safety Ecosystem Framework + the SSRN/Zenodo paper
404.html
assets/css/main.css     design tokens and all components
assets/js/main.js       nav, theme toggle, work filter, video modal, reveal,
                        live GitHub stats, analytics events
images/                 profile photo
papers/                 ssrn-5597390.pdf
```

## Local preview

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Editing the work grid

Cards live in `index.html` under `<section id="work">`. Each is an
`<article class="card reveal" data-cat="av|cv|re|safety|agents">`. The filter chips
above the grid read `data-filter` and match against `data-cat`. Update the counts in
`.chip__n` and the `ItemList` in the page's JSON-LD when adding or removing a card.

## Theme

Dark by default. `assets/css/main.css` defines every colour as a custom property on
`:root`, with the light palette under `:root[data-theme="light"]`. The toggle writes to
`localStorage`; an inline script in each `<head>` applies the stored value before first
paint.
