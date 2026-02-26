import { getCollection, type CollectionEntry } from "astro:content";

export type SeoPage = CollectionEntry<"seoPages">;

export async function getAllSeoPages(): Promise<SeoPage[]> {
	return await getCollection("seoPages");
}

export async function getSeoPageBySlug(slug: string): Promise<SeoPage | undefined> {
	const pages = await getAllSeoPages();
	return pages.find((p) => p.id === slug);
}

/**
 * Compute related pages using a scoring algorithm.
 * Manual `relatedPages` entries come first; auto-scored pages fill the rest.
 */
export async function getRelatedPages(page: SeoPage, limit = 4): Promise<SeoPage[]> {
	const allPages = await getAllSeoPages();

	const manualRelated = page.data.relatedPages
		.map((slug) => allPages.find((p) => p.id === slug))
		.filter((p): p is SeoPage => p !== undefined);

	const manualSlugs = new Set(manualRelated.map((p) => p.id));

	const autoRelated = allPages
		.filter((p) => p.id !== page.id && !manualSlugs.has(p.id))
		.map((p) => {
			let score = 0;
			if (p.data.vertical === page.data.vertical) score += 3;
			if (page.data.region && p.data.region === page.data.region) score += 3;
			if (p.data.pageType === page.data.pageType) score += 1;
			return { page: p, score };
		})
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score)
		.map((x) => x.page);

	return [...manualRelated, ...autoRelated].slice(0, limit);
}

import { buildOfferCatalog } from "./pricing";

const OFFER_CATALOG = buildOfferCatalog();

export function buildStructuredData(page: SeoPage, siteUrl: string) {
	const areaServed = page.data.areaServed
		? page.data.areaServed.state
			? {
					"@type": page.data.areaServed.type,
					name: page.data.areaServed.name,
					containedInPlace: { "@type": "AdministrativeArea", name: page.data.areaServed.state },
				}
			: { "@type": page.data.areaServed.type, name: page.data.areaServed.name }
		: { "@type": "Country", name: "US" };

	return {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		name: `Elaren Studio – ${page.data.title}`,
		description: page.data.description,
		url: `${siteUrl}/${page.id}`,
		provider: {
			"@type": "Organization",
			name: "Elaren Studio",
			url: siteUrl,
		},
		serviceType: "Web Design",
		areaServed,
		hasOfferCatalog: OFFER_CATALOG,
	};
}

export function buildFaqSchema(page: SeoPage) {
	if (!page.data.faqs.length) return null;
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: page.data.faqs.map((faq) => ({
			"@type": "Question",
			name: faq.q,
			acceptedAnswer: { "@type": "Answer", text: faq.a },
		})),
	};
}
