# Miroven-Web

[English](README.md) · [한국어](README.ko.md)

The official Miroven website, built with Astro. Product information, a bilingual blog, help, security guidance, and service policies in Korean and English.

[Website](https://miroven.mksdr.bid) · [Journal app](https://miroven-app.mksdr.bid) · [Contributing](CONTRIBUTING.md) · [Security reporting](SECURITY.md)

## Project scope

This repository builds a static website. Journal editing, authentication, vault encryption, and synchronization belong to the separate Miroven client and Miroven-API projects. This website does not access journal entries, photos, accounts, or vault keys.

- Korean and English pages at `/ko/` and `/en/`; `/` redirects to `/ko/`.
- Blog posts written in Markdown, with locale-specific RSS feeds.
- System, light, and dark themes; the theme preference is stored locally for this website.
- Static output with canonical URLs, a sitemap, and build-time link checks.

## Local development

Use Node.js **22.22.0 or later** and npm. CI uses Node.js 24. Run commands from this repository's root directory.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. No API server, account, or environment file is required for the website.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run check` | Check Astro templates and TypeScript |
| `npm test` | Run theme regression tests |
| `npm run build` | Generate the static site in `dist/` |
| `npm run preview` | Preview an existing build locally |
| `npm run verify` | Run checks, tests, build, and generated-site validation |

Before submitting a change:

```sh
npm run verify
npm run preview
```

Review affected pages in both languages, including mobile layouts and keyboard navigation. Automated checks do not establish production deployment or accessibility across all browsers.

## Repository layout

```text
src/
  components/       Shared site components
  config/site.ts    Official URLs and contact details
  content/blog/     Korean and English Markdown posts
  i18n/             Shared translations and locale helpers
  layouts/          Page and article layouts
  lib/              Blog filtering, routing, and date formatting
  pages/            Pages, RSS, robots.txt, and sitemap route
  styles/           Design tokens and stylesheets
public/             Static assets and theme initialization
scripts/            Theme tests and generated-site validation
.github/workflows/  GitHub Actions verification
```

## Content and deployment

Edit official URLs, the app link, source link, and support email in [`src/config/site.ts`](src/config/site.ts). The website source repository is [mksdr/Miroven-Web](https://github.com/mksdr/Miroven-Web).

Keep Korean and English content in sync.

The deployment target is **Cloudflare Pages**, with `npm run build` as the build command and `dist` as the output directory. GitHub hosts source code and runs verification; the current workflow does not deploy the website.

## Documentation

- [한국어 README](README.ko.md)
- [Contribution guide](CONTRIBUTING.md) — English and Korean
- [Security reporting](SECURITY.md) — English and Korean
- [License scope](LICENSING.md) — Korean

## License

Site software is licensed under [Apache-2.0](LICENSE). Website text and editorial content use **CC BY-NC 4.0**, subject to the exclusions in [LICENSING.md](LICENSING.md). Brand assets, trademarks, official policy texts, and third-party materials have separate terms. Preserve [NOTICE](NOTICE) and applicable third-party notices.
