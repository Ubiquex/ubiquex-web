# ubiquex-web

Next-generation Ubiquex website and blog. Next.js (App Router) with a static
export, deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev     # http://localhost:3000
npm run build   # static export -> ./out
```

## Layout

| Path                      | What it is                                          |
| ------------------------- | --------------------------------------------------- |
| `app/page.tsx`            | Marketing homepage                                   |
| `app/blog/page.tsx`       | Blog index                                           |
| `app/blog/[slug]/page.tsx`| One page per post, statically generated              |
| `content/blog/*.mdx`      | Posts. Git-based, no CMS                             |
| `components/ui/`          | Base components: Button, Card, Container, Nav, Footer|
| `lib/posts.ts`            | Frontmatter parsing, the source of truth for metadata|
| `mdx-components.tsx`      | Element styling for MDX bodies                       |
| `app/globals.css`         | Design tokens (`@theme`) — see below                 |

## Design tokens

Tailwind v4 is CSS-first: the theme lives in the `@theme` block of
`app/globals.css`, which is the v4 equivalent of `theme.extend` in a v3
`tailwind.config.js`. Each token is a real named utility, so no raw hex values
belong in components.

| Token                     | Value     | Use                       |
| ------------------------- | --------- | ------------------------- |
| `brand` / `brand-bright`  | `#00A693` / `#00C4AE` | Persian green, primary |
| `accent` / `accent-bright`| `#1C39BB` / `#4B5FD4` | Persian blue, links    |
| `highlight` / `highlight-bright` | `#CC2936` / `#E8404E` | Persian red, errors and CTAs |
| `ink`                     | `#0d1117` | Page background            |
| `panel`                   | `#161b22` | Cards, raised surfaces     |
| `edge`                    | `#21262d` | Hairline borders           |
| `fg` / `fg-muted`         | `#e6edf3` / `#8b949e` | Body and secondary text |

On the dark background, `accent` is too dark for body-size text — use
`accent-bright` for links and reserve `accent` for fills.

## Adding a post

Create `content/blog/<slug>.mdx` with frontmatter:

```mdx
---
title: "Post title"
date: "2026-08-15"
description: "One-line summary for the index page and meta description."
---
```

All three fields are required; the build fails if one is missing. Posts are
sorted by `date`, newest first, and the filename becomes the URL slug.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes
`out/` to GitHub Pages. Enable it under **Settings → Pages → Source: GitHub
Actions**.

No custom domain is configured yet. Two things to check at cutover:

- If the site is served from a project page (`<org>.github.io/ubiquex-web`)
  rather than a custom domain, set `basePath` in `next.config.mjs` or every
  asset URL will 404.
- A custom domain needs a `CNAME` file in `public/`, so it lands in the export.
