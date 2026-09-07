# Roadmap

Last updated: September 7, 2026

## Immediate

- Content-marketing inquiry mailbox delivery and Search Console owner access are verified. Sitemap resubmission remains pending through the owner UI or an OAuth write-scope upgrade; current API access is read-only. Recheck discovery/indexing of the three new routes after Google recrawls.

- Keep link validation and the 34-page production build green from the canonical Elaren/website path.
- Keep README, RUNBOOK, and handoff documents aligned with the actual dual content system.
- Website transferred to elaren-studio/website with repository identity and history preserved.
- Vercel project, production branch, selected-repository GitHub App access, production deployment, and elarenstudio.com attachment verified after reconnection.
- First post-transfer Git-triggered Production deployment verified Ready with the elarenstudio.com alias and GitHub success status.

## Maintenance

- Keep public LLM content files synchronized with major copy changes.
- Run the link validator and production build before pushing.
- Keep pricing and CTA sources centralized.
- Replace placeholder or draft brand assets only through an explicit website decision.

## Deferred

- Hosting-provider migration
- Broad content-system consolidation
- Removal of elaren_site_content while current routes still depend on it

## September 7, 2026 content marketing delivery

- Completed: content marketing page, fictional example, resource guide, desktop/mobile browser QA, and inquiry preparation/copy checks.
- Merged to main as `601873983159a660fea4e68dc3e1dd3ffffd20b4`; Vercel Production deployment `6312066835` succeeded. All three new production routes returned HTTP 200 with expected content.
- Verify live search-console/indexing and analytics state separately; this local implementation contains no measured traffic or conversion claim.
