import { getCollection, type CollectionEntry } from "astro:content";

export type Resource = CollectionEntry<"resources">;

export const TYPE_LABELS: Record<string, string> = {
	teardown: "Teardown",
	guide: "Guide",
	template: "Template",
};

export const TYPE_PLURALS: Record<string, string> = {
	teardown: "teardowns",
	guide: "guides",
	template: "templates",
};

export function getResourceUrl(resource: Resource): string {
	return `/resources/${TYPE_PLURALS[resource.data.type]}/${resource.id}`;
}

export function estimateReadingTime(text: string): number {
	const words = text
		.trim()
		.split(/\s+/)
		.filter((w) => w.length > 0).length;
	return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(dateStr: string): string {
	const date = new Date(dateStr + "T00:00:00");
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export async function getAllResources(): Promise<Resource[]> {
	const resources = await getCollection("resources", ({ data }) => !data.draft);
	return resources.sort((a, b) => {
		if (a.data.date && b.data.date) return b.data.date.localeCompare(a.data.date);
		if (a.data.date) return -1;
		if (b.data.date) return 1;
		return a.data.title.localeCompare(b.data.title);
	});
}

export async function getRelatedResources(
	current: Resource,
	limit = 3,
): Promise<Resource[]> {
	const all = await getAllResources();
	return all
		.filter((r) => r.id !== current.id)
		.map((r) => {
			let score = 0;
			if (r.data.type === current.data.type) score += 2;
			if (r.data.vertical && r.data.vertical === current.data.vertical) score += 3;
			const sharedTags = r.data.tags.filter((t) => current.data.tags.includes(t));
			score += sharedTags.length * 2;
			return { resource: r, score };
		})
		.filter((x) => x.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((x) => x.resource);
}
