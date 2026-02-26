# Elaren Studio — Runbook

Operational reference for [elarenstudio.com](https://elarenstudio.com). Start here when working on the site.

---

## Stack

| Layer        | Tool                          |
|-------------|-------------------------------|
| Framework   | Astro 5 (static output)       |
| Styling     | Tailwind CSS 4                |
| Content     | MDX via `@astrojs/mdx`        |
| Sitemap     | `@astrojs/sitemap` (auto)     |
| Forms       | FormSubmit (third-party)      |
| PDF gen     | Playwright (dev only)         |
| Hosting     | Static deploy (GitHub Pages / Vercel / etc.) |

Config: `astro.config.mjs` — site URL, integrations, Vite plugins.

---

## Commands

```
npm run dev        # Local dev server (typically localhost:4321)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run validate   # Check SEO page links + slug collisions
```

Always run `build` and `validate` before pushing.

---

## Project Structure

```
├── content/
│   └── seo-pages/           # MDX content for SEO landing pages
├── public/
│   ├── robots.txt            # Crawl directives + sitemap + LLMs-Txt
│   ├── llms.txt              # Structured summary for AI models
│   └── llms-full.txt         # Full Markdown content for AI models
├── scripts/
│   ├── validate-links.ts     # Link + slug collision validator
│   └── generate-pdf.mjs      # PDF generation via Playwright
├── src/
│   ├── components/
│   │   ├── seo/              # Reusable components for SEO pages
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── TherapistCta.astro
│   ├── layouts/
│   │   └── BaseLayout.astro  # Global layout (head, meta, OG tags)
│   ├── lib/
│   │   ├── cta-presets.ts    # CTA preset definitions + resolver
│   │   ├── pricing.ts        # Centralized plan pricing
│   │   ├── seo-pages.ts      # Related pages scoring + structured data
│   │   └── icons.ts          # Shared SVG icon registry
│   └── pages/
│       ├── [slug].astro      # Dynamic route for SEO content pages
│       ├── index.astro
│       ├── therapist-websites.astro  # Main money page
│       └── ...               # Static pages
└── src/content.config.ts     # Content collection schema (Zod)
```

---

## SEO Content System

SEO landing pages use Astro's content collections. Content lives in MDX files; the template and shared sections are handled by components.

### How it works

1. **Content entries** live in `content/seo-pages/*.mdx`
2. **Schema** is defined in `src/content.config.ts` (validated by Zod at build time)
3. **Dynamic route** `src/pages/[slug].astro` renders each entry
4. The filename (minus `.mdx`) becomes the URL slug: `therapist-website-design-dallas.mdx` → `/therapist-website-design-dallas`

### Adding a new SEO page

1. Create `content/seo-pages/your-page-slug.mdx`
2. Add required frontmatter (see schema below)
3. Write the MDX body using shared components
4. Add the slug to `relatedPages` in related entries (for cross-linking)
5. Run `npm run validate` to check links
6. Run `npm run build` to verify

### Frontmatter schema

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `title` | string | yes | — | Page title (BaseLayout appends " \| Elaren Studio") |
| `description` | string | yes | — | Meta description |
| `h1` | string | yes | — | Main heading |
| `heroKicker` | string | yes | — | Small text above H1 |
| `heroSubtitle` | string | yes | — | Paragraph below H1 |
| `trustLine` | string | no | "Clear scope. No surprises. No long-term contracts." | Below subtitle |
| `ctaPreset` | "audit" \| "call" \| "contact" | no | "audit" | Selects CTA text + href from presets |
| `ctaText` | string | no | — | Overrides preset text for this page only |
| `ctaHref` | string | no | — | Overrides preset href for this page only |
| `finalCtaHeadline` | string | yes | — | Bottom CTA section heading |
| `finalCtaSubtext` | string | no | — | Supports HTML (rendered with `set:html`) |
| `vertical` | string | yes | — | Topic cluster (e.g., "therapist") |
| `geo` | string | no | — | City/area slug (e.g., "dallas") |
| `region` | string | no | — | Broader region (e.g., "dfw") |
| `pageType` | "geo" \| "vertical" \| "practice-type" | yes | — | Determines pricing variant + cross-link scoring |
| `relatedPages` | string[] | no | [] | Slugs of manually linked pages |
| `areaServed` | object | no | — | Schema.org structured data: `{ type, name, state? }` |
| `faqs` | array | no | [] | `{ q, a }` pairs — generates FAQ section + FAQPage schema |
| `faqSectionTitle` | string | no | "Frequently asked questions" | Custom FAQ heading |
| `faqSectionSubtitle` | string | no | "Straightforward answers. No fine print." | Custom FAQ subhead |

### Page type behavior

| `pageType` | Pricing variant | Use case |
|---|---|---|
| `geo` | stacked (3 cards) | City-specific pages |
| `vertical` | stacked | Topic/niche pages |
| `practice-type` | stepped (2-step flow) | Practice-type pages (e.g., group) |

### Cross-linking

Related pages are computed automatically via a scoring algorithm in `src/lib/seo-pages.ts`:

- Same `vertical`: +3 points
- Same `region`: +3 points
- Same `pageType`: +1 point

Manual `relatedPages` entries always appear first. Up to 4 related pages are shown per page.

The `validate` script checks that all `relatedPages` slugs resolve to actual MDX files and that no slug collides with an existing static page in `src/pages/`.

---

## CTA Presets

**File:** `src/lib/cta-presets.ts`

| Preset | Text | Href |
|--------|------|------|
| `audit` (default) | Get a Free 10-Minute Website Audit | /therapist-websites#audit |
| `call` | Book a 15-Minute Call | /contact |
| `contact` | Start a Project | /contact |

### Changing the CTA site-wide

Edit the preset in `cta-presets.ts`. Every page using that preset updates automatically.

### Overriding for one page

In the MDX frontmatter:

```yaml
ctaPreset: audit
ctaText: "Custom Button Text Here"
```

The `ctaHref` stays from the preset unless also overridden.

---

## Pricing

**File:** `src/lib/pricing.ts`

Single source of truth for plan names, prices, descriptions, and billing periods. Used by:

- `src/components/seo/SeoPricing.astro` — rendered pricing cards
- `src/lib/seo-pages.ts` → `buildOfferCatalog()` — JSON-LD structured data

### Current plans

| Key | Name | Price | Billing |
|-----|------|-------|---------|
| `launch` | Website Launch | $500 | one-time |
| `starter` | WaaS Starter | $99 | monthly |
| `carePlus` | WaaS Care+ | $199 | monthly |

To change a price, edit `pricing.ts`. Both the visible UI and structured data update from that one file.

---

## Shared Components (SEO Pages)

All in `src/components/seo/`. Import them in MDX body content.

### Page-level (rendered by template, not MDX)

| Component | Purpose |
|-----------|---------|
| `SeoHero` | Hero section with H1, subtitle, trust line, CTA buttons |
| `SeoPricing` | Pricing section (stacked or stepped variant) |
| `SeoFaq` | Accordion FAQ section (from frontmatter `faqs`) |
| `SeoCta` | Final CTA section with primary + secondary buttons |
| `CrossLinks` | Auto-computed related pages grid |

### Body components (used in MDX)

| Component | Purpose | Key props |
|-----------|---------|-----------|
| `IconList` | Vertical list with icons | `items: { icon, title, desc? }[]` |
| `CardGrid` | 2-column card layout | `items: { title, desc, icon? }[]` |
| `CheckList` | Checkmark list | `items: string[]`, subtitle supports HTML |
| `StepTimeline` | Horizontal numbered steps | `steps: string[]`, subtitle supports HTML |
| `NumberedList` | Vertical numbered list | `items: string[]`, subtitle supports HTML |
| `Callout` | Bordered callout box | Uses `<slot />` for body content |
| `CtaBridge` | Inline mid-page CTA line | `text`, `linkText`, `href`, `suffix?` |
| `InteractiveChecklist` | Checkbox self-assessment | `items: string[]`, `footnote?` (HTML) |

### Common props (most body components)

- `bg`: `"paper"` (white) or `"muted"` (light gray) — alternate for visual rhythm
- `kicker`: Small uppercase label above the heading
- `title`: Section heading (H2)
- `subtitle`: Optional text below heading (some support HTML via `set:html`)

### Icon registry

**File:** `src/lib/icons.ts`

Named icon keys: `user`, `users`, `refresh`, `check`, `building`, `phone`, `globe`, `shield`, `box`, `chat`, `expand`, `frown`, `search`, `clock`.

Use named keys in `IconList` and `CardGrid` items. Raw SVG path strings also work as a fallback.

---

## SEO Artifacts

### Sitemap

Auto-generated by `@astrojs/sitemap` on every build.

- Index: `https://elarenstudio.com/sitemap-index.xml`
- Pages: `https://elarenstudio.com/sitemap-0.xml`

Registered in `robots.txt`. Google Search Console can be pinged after significant page additions, but routine crawling picks up changes.

### Structured data (JSON-LD)

Each SEO page emits two schemas (injected by `[slug].astro`):

1. **ProfessionalService** — service type, area served, offer catalog
2. **FAQPage** — only if `faqs` array is non-empty

Built by `buildStructuredData()` and `buildFaqSchema()` in `src/lib/seo-pages.ts`.

### LLM content

- `public/llms.txt` — structured summary (studio overview, services, values)
- `public/llms-full.txt` — full Markdown content of key pages
- `robots.txt` includes `LLMs-Txt:` directive

Update these manually when significant content changes are made.

### Meta / OG tags

Handled by `src/layouts/BaseLayout.astro`. Accepts `title`, `description`, and optional `ogImage` props. The title tag renders as `{title} | Elaren Studio`.

---

## Forms

The therapist websites page (`/therapist-websites`) uses [FormSubmit](https://formsubmit.co/) for lead capture. The form POSTs to FormSubmit's endpoint and redirects on success. Fields: name, email, practice name, current website URL, team size, timeline.

---

## Validation & Guardrails

### Link validator (`npm run validate`)

Checks two things:

1. Every slug in `relatedPages` frontmatter resolves to an actual `.mdx` file in `content/seo-pages/`
2. No SEO page slug collides with an existing static page in `src/pages/` (e.g., creating `pricing.mdx` would conflict with `pricing.astro`)

### Build-time schema validation

Zod validates all frontmatter fields at build time. Missing required fields or wrong types cause a build error with a clear message.

---

## Deployment Checklist

When adding new pages or making significant changes:

1. `npm run validate` — check links and slug collisions
2. `npm run build` — verify clean build
3. Spot-check locally with `npm run dev`
4. Push to GitHub
5. If new pages were added: consider pinging Google Search Console with the sitemap URL
6. If content changed significantly: update `public/llms.txt` and `public/llms-full.txt`

---

## Key Files Quick Reference

| What | Where |
|------|-------|
| Site config | `astro.config.mjs` |
| Content schema | `src/content.config.ts` |
| SEO page content | `content/seo-pages/*.mdx` |
| SEO page template | `src/pages/[slug].astro` |
| CTA presets | `src/lib/cta-presets.ts` |
| Pricing config | `src/lib/pricing.ts` |
| Related pages logic | `src/lib/seo-pages.ts` |
| Icon registry | `src/lib/icons.ts` |
| Link validator | `scripts/validate-links.ts` |
| Global layout | `src/layouts/BaseLayout.astro` |
| Main money page | `src/pages/therapist-websites.astro` |
| Robots / LLM files | `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt` |
