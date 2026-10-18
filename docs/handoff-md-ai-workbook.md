# Handoff: MD and AI workbook page

## What shipped

A self-contained HTML workbook was added to the portfolio site and deployed on GitHub Pages.

| Item | Detail |
| --- | --- |
| Live URL | https://anest58.github.io/md-ai-workbook |
| Canonical path | `/md-ai-workbook` (GitHub Pages redirects to `/md-ai-workbook/`) |
| Source file | `public/md-ai-workbook/index.html` |
| Nav entry | Desktop navbar **Workbook** → `/md-ai-workbook` in `src/components/portfolio/Navbar.astro` |
| Deploy commit | `22b9da0` — *Add MD and AI workbook as a static site page* |
| PR | https://github.com/ANest58/anest58.github.io/pull/2 (merged into `main`) |

## Why this approach

The workbook is a single self-contained HTML file (own CSS, fonts, and JS, including `localStorage` for notes). It is **not** wrapped in Astro layouts.

Putting it under `public/` copies it unchanged into `dist/` at build time, so Astro does not process or break it.

## Files touched

1. **`public/md-ai-workbook/index.html`**  
   Uploaded workbook content (originally `md-ai-workbook.html`). Served as a static asset.

2. **`src/components/portfolio/Navbar.astro`**  
   Added `{ text: 'Workbook', href: '/md-ai-workbook' }` (no trailing slash; site config uses `trailingSlash: false`).

3. **`.prettierignore`**  
   Added `public/md-ai-workbook/**` so Prettier does not reformat the large standalone HTML.

## What was intentionally not done

- No Astro/MDX rewrite of the workbook.
- Not placed under a separate `md-ai-workbook` GitHub repo (that was an alternate plan in an uploaded `upload-to-github.md` guide; this site hosts it instead).
- Mobile navbar still only shows Resume / GitHub shortcuts; **Workbook** appears in the desktop nav links. Direct URL works on all devices.
- Notes and ticks stay in the browser (`localStorage`); they are not synced by this repo.

## How to update the workbook later

When you get a new `md-ai-workbook.html`:

```bash
cp /path/to/md-ai-workbook.html public/md-ai-workbook/index.html
git add public/md-ai-workbook/index.html
git commit -m "Update MD and AI workbook"
git push origin main   # or open a PR; Deploy to GitHub Pages runs on push to main
```

After deploy, hard-refresh if you still see a cached old copy (Ctrl+Shift+R / Cmd+Shift+R). Notes persist as long as the site address stays the same.

## Deploy path

- Workflow: `.github/workflows/deploy.yaml`  
- Trigger: push to `main`  
- Build: Astro static build via `withastro/action`  
- Host: GitHub Pages for `anest58.github.io`

## Verify locally

```bash
npm run build
npm run preview
# open http://127.0.0.1:4321/md-ai-workbook
```

Note: local Astro preview with `trailingSlash: never` serves `/md-ai-workbook` (200) but `/md-ai-workbook/` may 404. Production GitHub Pages accepts both (`/md-ai-workbook` → 301 → `/md-ai-workbook/`).

## Related uploaded notes (not committed)

An `upload-to-github.md` guide described publishing the workbook as its own public Pages repo. That was **not** used; hosting on this site was preferred. Keep that guide elsewhere if you still want a private-repo / standalone-Pages option.

## Quick context for the next person

- Portfolio stack: Astro v6 + Tailwind v4 (see `AGENTS.md`).
- Workbook is personal study content (MD + ML); it may mention project-specific details. Treat visibility as intentional but low-profile (nav link + URL, not a featured project card).
