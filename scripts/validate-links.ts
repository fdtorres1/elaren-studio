/**
 * Validate SEO page content collection.
 * - Checks that all `relatedPages` slugs resolve to actual MDX entries.
 * - Checks for slug collisions with existing static pages in src/pages/.
 *
 * Usage: npx tsx scripts/validate-links.ts
 */

import { readdir } from "fs/promises";
import { readFile } from "fs/promises";
import { basename, extname, join } from "path";

const SEO_PAGES_DIR = join(process.cwd(), "content/seo-pages");
const STATIC_PAGES_DIR = join(process.cwd(), "src/pages");

async function getSlugs(): Promise<Set<string>> {
	const files = await readdir(SEO_PAGES_DIR);
	return new Set(
		files
			.filter((f) => extname(f) === ".mdx")
			.map((f) => basename(f, ".mdx"))
	);
}

async function getStaticPageSlugs(): Promise<Set<string>> {
	const files = await readdir(STATIC_PAGES_DIR);
	return new Set(
		files
			.filter((f) => extname(f) === ".astro" && !f.startsWith("["))
			.map((f) => basename(f, ".astro"))
			.filter((name) => name !== "index")
	);
}

async function extractRelatedPages(
	filePath: string
): Promise<{ slug: string; relatedPages: string[] }> {
	const content = await readFile(filePath, "utf-8");
	const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
	if (!frontmatterMatch) return { slug: basename(filePath, ".mdx"), relatedPages: [] };

	const frontmatter = frontmatterMatch[1];
	const relatedPages: string[] = [];
	let inRelated = false;

	for (const line of frontmatter.split("\n")) {
		if (line.startsWith("relatedPages:")) {
			inRelated = true;
			continue;
		}
		if (inRelated) {
			const match = line.match(/^\s+-\s+(.+)$/);
			if (match) {
				relatedPages.push(match[1].trim());
			} else {
				inRelated = false;
			}
		}
	}

	return { slug: basename(filePath, ".mdx"), relatedPages };
}

async function main() {
	const slugs = await getSlugs();
	const staticSlugs = await getStaticPageSlugs();
	const files = await readdir(SEO_PAGES_DIR);
	const mdxFiles = files.filter((f) => extname(f) === ".mdx");

	let errors = 0;

	for (const slug of slugs) {
		if (staticSlugs.has(slug)) {
			console.error(`[ERROR] Slug collision: "${slug}" exists as both a content entry and a static page (src/pages/${slug}.astro)`);
			errors++;
		}
	}

	for (const file of mdxFiles) {
		const filePath = join(SEO_PAGES_DIR, file);
		const { slug, relatedPages } = await extractRelatedPages(filePath);

		for (const ref of relatedPages) {
			if (!slugs.has(ref)) {
				console.error(`[ERROR] ${slug}: relatedPages references "${ref}" but no matching MDX file exists`);
				errors++;
			}
		}
	}

	console.log(`\nValidated ${mdxFiles.length} SEO pages, ${slugs.size} slugs found.`);
	console.log(`Checked against ${staticSlugs.size} static pages for collisions.`);

	if (errors > 0) {
		console.error(`\n${errors} error(s) found.`);
		process.exit(1);
	} else {
		console.log("All checks passed.");
	}
}

main().catch((err) => {
	console.error("Validation failed:", err);
	process.exit(1);
});
