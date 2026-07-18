# AstroWind Agent Instructions

## Project Overview

Personal portfolio site based on **Astro v6** and **Tailwind CSS v4**. Static site optimized for performance, SEO, and accessibility. Blog/MDX template features have been removed.

**Stack:** Astro v6 | Tailwind CSS v4 | TypeScript 5.9 | Sharp

## Quick Reference

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server at localhost:4321  |
| `npm run build`   | Production build to `./dist/`       |
| `npm run preview` | Preview production build locally    |
| `npm run check`   | Run astro check + ESLint + Prettier |
| `npm run fix`     | Auto-fix ESLint + Prettier issues   |

**Node.js requirement:** >= 22.12.0

## Architecture

### Directory Structure

```
src/
  assets/styles/tailwind.css   # Tailwind v4 config (themes, utilities, plugins)
  components/
    common/        # Shared: Metadata, Analytics, ToggleTheme
    portfolio/     # Portfolio sections: Hero, Navbar, TechStack, etc.
    CustomStyles.astro  # CSS variables for colors and fonts
  data/            # site.ts, projects.ts
  layouts/         # Layout.astro, PortfolioLayout.astro
  pages/           # index, projects, ask, 404
  utils/           # images.ts, permalinks.ts, fitAgent.ts, utils.ts
  config.yaml      # Site configuration (loaded as virtual module)
  types.d.ts       # TypeScript type definitions
vendor/integration/    # Custom Astro integration for config loading
spaces/anest58Ask/     # Hugging Face Space (Ask LLM)
```

### Path Aliases

Use `~/` to import from `src/`:

```typescript
import Hero from '~/components/portfolio/Hero.astro';
import { SITE } from 'astrowind:config';
```

### Configuration System

Site config lives in `src/config.yaml` and is loaded as a Vite virtual module `astrowind:config` by the custom integration in `vendor/integration/`. Exports: `SITE`, `I18N`, `METADATA`, `UI`, `ANALYTICS`.

## Tailwind CSS v4

Configuration is CSS-first in `src/assets/styles/tailwind.css`:

- **Theme tokens:** `@theme { --color-primary: var(--aw-color-primary); ... }`
- **Custom utilities:** `@utility bg-page { ... }`
- **Dark mode:** Class-based via `@variant dark (&:where(.dark, .dark *))`
- **Plugins:** `@plugin "@tailwindcss/typography"`
- **Custom variant:** `@custom-variant intersect (&:not([no-intersect]))`

CSS variables for colors/fonts are defined in `src/components/CustomStyles.astro` with light/dark theme variants.

The Vite plugin `@tailwindcss/vite` is configured in `astro.config.ts` (not as an Astro integration).

### Class Merging

Components use `twMerge` from `tailwind-merge` v3 for conditional class composition.

## Component Patterns

- Props extend interfaces from `~/types` when needed
- Use `class:list` for conditional classes
- Use `twMerge()` when accepting className overrides
- Portfolio content lives in `src/data/site.ts` and `src/data/projects.ts`

## Verification Checklist

After changes, always verify:

1. `npm run build` succeeds
2. `npm run check` passes (astro check + ESLint + Prettier)
3. Visual check in browser: homepage, projects, ask, dark mode, mobile menu
