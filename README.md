# Elaren Studio Website

A clean, fast static website built with Astro, TypeScript, and Tailwind CSS.

## Tech Stack

- **Astro 5.15.4** - Static site generation
- **TypeScript** - Strict mode enabled
- **Tailwind CSS 4.1.17** - Utility-first CSS with brand kit configuration
- **Markdown** - Content-driven architecture

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
elaren_studio_com/
├── elaren_site_content/    # Markdown content files
├── src/
│   ├── components/         # Reusable Astro components
│   ├── layouts/            # Page layouts
│   ├── pages/              # Route pages
│   ├── styles/             # Global CSS and design tokens
│   └── utils/              # Helper functions
├── public/                 # Static assets
└── tailwind.config.mjs     # Tailwind configuration
```

## Features

- ✅ Content-driven architecture (markdown files)
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized (meta tags, Open Graph)
- ✅ Contact form (FormSubmit integration)
- ✅ Fast static generation
- ✅ Optimized codebase (no redundant CSS, streamlined components)
- ✅ Hero section binary pattern background (encodes "ELAREN STUDIO" in ASCII)
- ✅ About page with values section (Clarity, Endurance, Care, Respect)
- ✅ Resources page (currently hidden from navigation)
- ✅ Contact page with enhanced form styling and design consistency
- ✅ Privacy and Terms pages with consistent design patterns
- ✅ Work items showcase: Wright Wellness, Mesquite Symphony Orchestra, Caminos del Inka
- ✅ Comprehensive pricing page with WaaS plans, one-time builds, landing pages, add-ons, FAQs, and market proof
- ✅ Pricing consistency across all pages (Design & Build \$3,800, WaaS from \$175/month, Landing Pages \$1,000)
- ✅ /plans redirects to /pricing (301 redirect)

## Contact Form Setup

The contact form uses [FormSubmit](https://formsubmit.co/) (free, no signup required) and sends submissions to `hello@elarenstudio.com`.

The form is already configured and ready to use. FormSubmit will:
- Send form submissions directly to your email
- Handle spam protection automatically
- Redirect users back to the contact page with a success message

No additional setup required!

## Content Management

Content is managed in the `elaren_site_content/` folder. Each markdown file includes:
- Frontmatter with metadata (title, slug, description)
- Markdown content that's automatically converted to HTML

## Brand Guidelines

See `elaren_brand_kit.md` for complete brand guidelines, colors, typography, and design tokens.

## Deployment

This site is configured for Vercel deployment. Connect your repository to Vercel and it will automatically build and deploy.

## Code Quality

- Root cause fixes instead of CSS patches
- Consolidated CSS rules (no duplicates)
- Removed unused code and variables
- Streamlined components for better performance
