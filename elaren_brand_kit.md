# Elaren Studio — Brand Kit (v1)

> Calm, professional, crafted. Elaren Studio builds and cares for clean, enduring websites.

---

## 1) Brand Foundations

**Positioning (internal):**
Elaren Studio is a boutique web studio specializing in fast, static websites and ongoing care plans for small organizations. We combine design restraint with operational reliability.

**One-liner (external):**
**“We build bright, enduring websites—and keep them that way.”**

**Elevator pitch (75 words):**
Elaren Studio designs and maintains clean, fast websites for small organizations. We ship quickly from proven templates, then keep everything secure, updated, and on-brand through simple care plans. Our approach blends design clarity, technical rigor, and responsive support—so your site stays fast, modern, and trustworthy without the headaches. We handle the details; you stay focused on your work.

**Values:** Clarity · Craft · Reliability · Pace · Respect

**Tone of voice:**

* Confident, not loud
* Precise, not jargon-y
* Helpful, not salesy
* Calm momentum (verbs > adjectives)

**Messaging pillars (with proof):**

1. **Clarity by design** — simple layouts, typographic hierarchy, lean components.
2. **Built to endure** — static stack, global CDN, minimal dependencies.
3. **Care that scales** — lightweight monthly updates, proactive checks, usage alerts.

**Tagline options:**

* *Structure. Light. Clarity.*
* *Built clean. Kept current.*
* *Bright websites, steady care.*

---

## 2) Naming & Pronunciation

**Name:** Elaren Studio
**Pronunciation:** *eh-LAIR-en* (rhymes with “flare-in”)

---

## 3) Visual Identity

### 3.1 Logo System

* **Primary wordmark:** `ELAREN STUDIO` (caps) or `Elaren Studio` (title case) set in a refined geometric sans.
* **Secondary (stacked):**

  ```
  ELAREN
  STUDIO
  ```
* **Monogram:** `ES` or single `E` constructed on the same grid as the wordmark.

**Safe areas:** x = cap height of the “E”. Maintain ≥ 1x padding on all sides.

**Minimum sizes:**

* Wordmark digital: ≥ 120 px width
* Monogram digital: ≥ 24 px

**Don’ts:** no gradients, no drop shadows, no outlines, no stretching.

> If you want a first-pass vector: set the wordmark in **General Sans** (free) or **Söhne/Neue Haas Grotesk** (licensed) with +5% tracking for airy calm.

---

### 3.2 Color

Two complementary directions. Pick one as **Primary**; keep the other as an optional seasonal/theme set.

**A) Professional Calm (default)**

* **Ink**: `#101317` (Primary Text / Logo)
* **Lumen**: `#3A78FF` (Accent)
* **Slate-900**: `#0F1720` (Background deep)
* **Slate-100**: `#E6EAF0` (Subtle dividers)
* **Paper**: `#FFFFFF` (Surface)

**B) Warm Craft (alternate)**

* **Char**: `#1A1A1A`
* **Amber**: `#D28B0C` (Accent)
* **Moss**: `#2F4F3A` (Secondary accent)
* **Alabaster**: `#F6F4F1` (Surface)
* **Stone-400**: `#C3BDB6` (Lines)

**Accessibility:** Maintain 4.5:1 contrast for body text; at least 3:1 for large headings.

---

### 3.3 Typography

**Primary Sans (UI/Wordmark):**

* **General Sans** (free) or **Inter** (free, variable).
* Usage: Headers, nav, buttons, wordmark.

**Secondary Serif (Editorial):**

* **Source Serif 4** (free) or **IBM Plex Serif**.
* Usage: Long-form body, quotes.

**Type scale (rem):**

* H1 2.5 / H2 2.0 / H3 1.5 / Body 1.0 / Small 0.875
* Tracking: +1 to +3 for headings; 0 for body.

---

### 3.4 Iconography & Illustration

* Simple 1.5px strokes, rounded joins.
* Metaphors: frame, grid, signal, lighthouse/beam (abstract), caret.
* Keep icons monochrome Ink on Paper; accent sparingly.

---

### 3.5 Imagery

* Real workspace/detail shots; no generic tech stock.
* Emphasize white space, clean devices, hand-sketches, grid notes.
* When using client images, apply subtle desaturation for consistency.

---

## 4) Digital System

### 4.1 Design Tokens (CSS custom properties)

```css
:root{
  --clr-ink:#101317; --clr-paper:#ffffff;
  --clr-accent:#3A78FF; --clr-slate-900:#0F1720; --clr-slate-100:#E6EAF0;

  --ff-sans:"Inter", system-ui, sans-serif;
  --ff-serif:"Source Serif 4", serif;

  --fs-h1:2.5rem; --fs-h2:2rem; --fs-h3:1.5rem; --fs-body:1rem; --fs-small:0.875rem;
  --radius:14px; --shadow:0 6px 30px rgba(16,19,23,0.08);
  --gap:1.25rem; --line:1px solid var(--clr-slate-100);
}
```

### 4.2 Tailwind preset (drop-in)

```js
// tailwind.config.js (excerpt)
module.exports = {
  theme: {
    extend: {
      colors: {
        ink:'#101317', paper:'#ffffff',
        accent:'#3A78FF', slate: {100:'#E6EAF0', 900:'#0F1720'}
      },
      borderRadius:{'xl':'14px'},
      boxShadow:{brand:'0 6px 30px rgba(16,19,23,0.08)'},
      fontFamily:{sans:['Inter','system-ui'], serif:['"Source Serif 4"','serif']},
      fontSize:{h1:['2.5rem',{lineHeight:'1.1'}], h2:['2rem',{lineHeight:'1.15'}], h3:['1.5rem',{lineHeight:'1.2'}]}
    }
  }
}
```

### 4.3 Components (UI language)

* **Button primary:** Ink text on Accent background; radius 14; shadow brand on hover.
* **Card:** Paper surface, 14 radius, brand shadow, 24 padding, header with H3 and subtle divider.
* **Section heading:** H2 with small kicker above (uppercase, tracking +90).

---

## 5) Copy & Voice

**Home hero (short):**
**Bright, enduring websites.**
We design, launch, and care for clean, fast sites—so your team can focus on the work that matters.

**Services blurb:**

* **Design & Build** — modern layouts, clear hierarchy, fast static stack.
* **Care Plans** — updates, content edits, monitoring, and calm support.
* **Landing Pages** — campaign-ready pages you can approve from a preview link.

**About line:**
Elaren Studio pairs design restraint with reliable operations to keep your site fast, current, and trustworthy.

**Microcopy patterns:**

* Buttons: *Start a project · Book a call · See plans*
* Form success: *Thanks—your brief is in. We’ll reply within one business day.*
* Empty states: *No updates yet. Add a request and we’ll draft a preview.*

---

## 6) Layout / Grid

* **Container:** 1200px max; gutters 24px mobile → 40px desktop.
* **Grid:** 12-col (desktop), 6-col (tablet), 4-col (mobile).
* **Rhythm:** base spacing 8px, common step 24px.

---

## 7) Applications

### 7.1 Website header (example)

```
[ ELAREN STUDIO ]   Work  Services  Plans  About  Resources   [ Start a project ]
```

* Sticky on scroll; reduce H by 8px after 60px scroll.

### 7.2 Social profile boilerplate

**Bio (150 chars):**
Bright, enduring websites—built fast, kept current. Design + static stack + calm care plans.

**First pinned post:**
We build bright, enduring websites—and keep them that way. New care plans for 2026 now open. → elarenstudio.com

### 7.3 Email signature (text)

```
Felix Torres
Elaren Studio — Bright, enduring websites
felix@elarenstudio.com  ·  elarenstudio.com
(###) ###-####
```

### 7.4 Business card (front)

```
ELAREN STUDIO
Bright, enduring websites.
elarenstudio.com
```

Back: name + contact; white Paper stock, Ink text, subtle Slate-100 line.

### 7.5 Favicon & mark

* **Favicon:** monogram `E` set in Ink on Paper; 32px, 64px, 180px variants.
* **App icon:** rounded-rect, Accent background, Ink monogram.

---

## 8) Social & SEO

**Open Graph (OG) template:**

* Background: Paper with subtle grid.
* Wordmark top-left; big headline: *Bright, enduring websites.*
* Size: 1200×630; export PNG.

**Meta description (155 chars):**
Elaren Studio designs and maintains clean, fast websites. Static stack, preview-first workflow, simple care plans.

**Schema:** Organization + WebSite; include sameAs links to social profiles.

---

## 9) File Architecture (repo)

```
/brand
  /logo
    elaren-wordmark.svg
    elaren-monogram.svg
  /color
    tokens.json
  /type
    specimens.pdf
  /social
    og-template.fig
    avatar.png
/web
  /public
    favicon-32.png
    favicon-180.png
    apple-touch-icon.png
  /styles
    tokens.css
    tailwind.config.js
  /content
    copy-home.md
    copy-plans.md
/docs
  brand-guidelines.md
```

---

## 10) Hand-off Checklist

* [ ] Register domains: **elarenstudio.com**, `.studio`, `.design`
* [ ] Claim handles: **@elarenstudio** (X, IG, LinkedIn Page, YouTube)
* [ ] Export logo: SVG + PNG @1x/2x (dark/light)
* [ ] Export icons: 16/32/64/180 px
* [ ] Set OG defaults site-wide
* [ ] Install Inter + Source Serif 4 (self-hosted or Google Fonts)
* [ ] Add analytics + uptime monitoring
* [ ] Create “Updates” form → GitHub Issues → Preview Deploy

---

## 11) Plan Page Copy (starter)

**Care Plans**
*Keep your site current without the chaos.*

| Plan     | Monthly | Includes                                                     |
| -------- | ------: | ------------------------------------------------------------ |
| Starter  |    $129 | Hosting/CDN/SSL, 1 small update/mo, uptime checks            |
| Standard |    $199 | 3 small updates/mo, priority support, 2×/yr on-page SEO      |
| Plus     |    $349 | + quarterly landing page, monthly analytics email, 48-hr SLA |

*Small update ≤ 30 minutes. No banking. Larger items quoted as mini-projects.*

---

## 12) QA Standards

* Lighthouse: Performance ≥ 95, Accessibility ≥ 95
* HTML: semantic landmarks; aria-labels for interactive components
* Contrast: AA minimum
* Image policy: webp/avif, width descriptors, lazyload
* Links: underline on hover; visited color shift optional

---

## 13) Legal/Boilerplate

**Boilerplate (press / footer):**
Elaren Studio designs and maintains bright, enduring websites for small organizations. We pair design restraint with reliable operations so your site stays fast, current, and trustworthy.

---

## 14) Stretch Assets (optional)

* **Case study card template** (image left, text right, 2:1 ratio)
* **Slides (15pp)** deck for chamber/BNI talk (cover, offer, before/after, plans, CTA)
* **Email nurture x3** short series: intro → proof → plans

---

### Quick Visual Starter (in words)

* White Paper background, Ink wordmark top-left.
* Accent used for CTAs and key links only.
* Big H1 (“Bright, enduring websites.”) with a soft paragraph.
* A single hero screenshot inside an 8px grid frame.
* Three pillars in cards.
* Social proof strip.
* Plans table.
* Simple footer.
