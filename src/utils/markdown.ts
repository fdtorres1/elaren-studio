export interface MarkdownFrontmatter {
	title: string;
	slug?: string;
	description?: string;
	summary?: string;
	date?: string;
}

export function parseMarkdown(content: string): { frontmatter: MarkdownFrontmatter; body: string } {
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return {
			frontmatter: { title: '' },
			body: content,
		};
	}

	const frontmatterText = match[1];
	const body = match[2];

	const frontmatter: MarkdownFrontmatter = {
		title: '',
	};

	// Simple YAML parsing for our use case
	frontmatterText.split('\n').forEach((line) => {
		const colonIndex = line.indexOf(':');
		if (colonIndex === -1) return;

		const key = line.slice(0, colonIndex).trim();
		let value = line.slice(colonIndex + 1).trim();

		// Remove quotes if present
		if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
			value = value.slice(1, -1);
		}

		if (key === 'title') frontmatter.title = value;
		if (key === 'slug') frontmatter.slug = value;
		if (key === 'description') frontmatter.description = value;
		if (key === 'summary') frontmatter.summary = value;
		if (key === 'date') frontmatter.date = value;
	});

	return { frontmatter, body };
}

