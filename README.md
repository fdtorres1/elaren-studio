# Elaren Studio Website

A clean, fast static website built with Astro, TypeScript, and Tailwind CSS.

## Setup

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

## Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) (free, no signup required). To set it up:

1. Visit https://web3forms.com/
2. Enter your email address to get an access key
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `src/pages/contact.astro` with your access key

## Content

Content is managed in the `elaren_site_content/` folder. Each markdown file includes frontmatter with metadata (title, slug, description) and the page content below.

## Deployment

This site is configured for Vercel deployment. Simply connect your repository to Vercel and it will automatically build and deploy.

## Brand Guidelines

See `elaren_brand_kit.md` for complete brand guidelines, colors, typography, and design tokens.
