# Active Context

Last updated: September 7, 2026

## Current state

- This is the canonical local Elaren Studio website checkout.
- Local path: /Volumes/Felix-SSD-1/Cursor Projects/Elaren/website
- Git history and tags were cloned from the former elaren_studio_com checkout.
- Canonical remote is https://github.com/elaren-studio/website.git.
- Current production domain configured in source is https://elarenstudio.com.
- The site uses Astro 7, TypeScript, Tailwind CSS 4, MDX content collections, FormSubmit, and Plausible.
- The site presents Elaren Studio as an app studio and dev shop per D-007; therapist and local-SEO pages remain live but unlinked from navigation.
- Dependencies were fully updated on July 29, 2026, including the Astro 5-to-7 and MDX 4-to-7 majors; npm audit reports zero vulnerabilities.
- The production build currently generates 34 static pages.
- The therapist offering was repriced on August 9, 2026: Website Launch $500 founding client rate (standard $1,200), Essentials $49/mo (formerly WaaS Starter $99), Care+ $129/mo (formerly WaaS Care+ $199), plus a +$750 copywriting add-on; /therapist-websites gained an AI-builder comparison section, and pricing.ts, the city SEO pages, resource guides, and llms-full.txt were synchronized.
- /studioregister is a Studio Register product landing page added on July 23, 2026 to support Stripe business verification; it follows the product's legal-naming boundary (An Elaren Studio product; owned and operated by Wright Torres Group, LLC; no d/b/a language) and may later grow into a fuller product site.
- Therapist offering repriced August 9, 2026 for Facebook-group promotion: Website Launch $500 founding rate (standard $1,200), Essentials $49/mo (was WaaS Starter $99), Care+ $129/mo (was WaaS Care+ $199), plus a +$750 copywriting add-on; synchronized across the therapist page, src/lib/pricing.ts, city SEO pages, resource guides, and llms-full.txt.

## Repository boundary

This repository owns website implementation and public copy. Elaren company strategy, portfolio planning, naming, and master brand-source assets are canonical in the sibling HQ repository.

## Migration boundary

- The clean clone intentionally excluded node_modules, dist, .astro, SpecStory history, test output, and generated PDF output.
- Former untracked raster logo drafts were catalogued in HQ, not added to website public assets because no website code referenced them.
- The tracked legacy zip snapshot was retired; active elaren_site_content files remain because current routes read them.
- The stale SETUP.md was retired in favor of README.md and RUNBOOK.md.

## Verified external state

- Elevated GitHub CLI authentication is active for fdtorres1.
- The public repository was transferred and renamed from fdtorres1/elaren-studio to elaren-studio/website. GitHub preserved repository ID 1092039889, history, main, environments, and the former-path redirect; fdtorres1 retains ADMIN permission.
- Local main matches origin/main; check git for the current head rather than relying on a pinned commit in this document.
- GitHub records Preview and Production environments.
- The authenticated Vercel project is felixs-projects-a5ff4c9b/elaren-studio, project ID prj_xFdQeKvaDH8l5LeD4smVEUxmM2FX.
- Vercel is connected to GitHub repository ID 1092039889 at elaren-studio/website with production branch main, Astro preset, repository-root builds, and Node.js 22.x.
- The Vercel GitHub App is installed on elaren-studio with selected-repository access limited to website.
- elarenstudio.com remains attached to the Vercel project with the intended Vercel nameservers.
- Pushes to main reliably create Ready Production deployments aliased to elarenstudio.com; the deployment history is recorded in WORKLOG.md.
- Preview deployments are protected by Vercel SSO.
- Main is not branch-protected.

## External state not yet verified

- FormSubmit account ownership
- Plausible account ownership

The repository owner, name, local origin, and Vercel Git connection changed successfully. The Vercel project, domain, DNS, form, and analytics settings did not change.

## Next actions

1. Continue running validation and a production build before pushes to main.
2. Verify FormSubmit and Plausible account ownership separately when needed.

## September 7, 2026 content marketing implementation

- Added `/content-marketing` service page with scoped pricing, boundaries, visible FAQs, Service structured data, and a mailto-only inquiry composer addressed to the existing public `hello@elarenstudio.com` route.
- Added fictional demonstration route `/work-examples/program-campaign` and guide resource `/resources/guides/what-to-send-a-content-partner`.
- Linked the new services from `/services`, the footer, and cross-linked examples and guides. Updated `public/llms.txt` with the new offers/resources.
- This work is local and ready for user review. Validation/build and root desktop/mobile browser QA passed, including offer navigation, FAQ, inquiry preparation/copy, and both themes. No external inquiry was sent, no deployment or indexing/analytics outcome is claimed, and no credentials or third-party integrations were added.

### Source publication

The user authorized committing and pushing this implementation, followed by a second documentation commit recording the verified first push. Target: `origin`, repository `elaren-studio/website`, branch `feature/marketing-offer-2026-09-07`. Main and production deployment are not part of this branch push. Push confirmation will be recorded after remote readback.
