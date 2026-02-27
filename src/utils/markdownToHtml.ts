export function markdownToHtml(markdown: string): string {
	let html = markdown;

	// Process tables first (before other processing)
	const tableRegex = /(\|.+\|(?:\n\|[:\-| ]+\|)?(?:\n\|.+\|)+)/g;
	html = html.replace(tableRegex, (tableBlock) => {
		const lines = tableBlock.trim().split('\n').filter(line => line.trim());
		if (lines.length < 2) return tableBlock;

		let tableHtml = '<table class="w-full border-collapse my-6"><thead><tr>';
		
		// Header row
		const headerCells = lines[0].split('|').map(c => c.trim()).filter(c => c);
		headerCells.forEach(cell => {
			const cleanCell = cell.replace(/\*\*/g, '');
			tableHtml += `<th class="border border-slate-100 px-4 py-3 text-left font-semibold">${cleanCell}</th>`;
		});
		tableHtml += '</tr></thead><tbody>';

		// Data rows (skip separator line at index 1)
		for (let i = 2; i < lines.length; i++) {
			const cells = lines[i].split('|').map(c => c.trim()).filter(c => c);
			tableHtml += '<tr>';
			cells.forEach((cell, idx) => {
				const cleanCell = cell.replace(/\*\*/g, '');
				const isFirstCol = idx === 0;
				tableHtml += `<td class="border border-slate-100 px-4 py-3 ${isFirstCol ? 'font-medium' : ''}">${cleanCell}</td>`;
			});
			tableHtml += '</tr>';
		}

		tableHtml += '</tbody></table>';
		return tableHtml;
	});

	// Horizontal rules
	html = html.replace(/^---\s*$/gm, '<hr class="border-t border-slate-200 my-10" />');

	// Line breaks: trailing double-space → <br>
	html = html.replace(/ {2,}\n/g, '<br />\n');

	// Headers
	html = html.replace(/^### (.*$)/gim, '<h3 class="text-h3 font-semibold mt-8 mb-4">$1</h3>');
	html = html.replace(/^## (.*$)/gim, '<h2 class="text-h2 font-semibold mt-12 mb-6">$1</h2>');
	html = html.replace(/^# (.*$)/gim, '<h1 class="text-h1 font-semibold mb-6">$1</h1>');

	// Bold
	html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

	// Italic
	html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

	// Links [text](url)
	html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-ink font-medium hover:text-accent hover:underline transition-colors">$1</a>');

	// Lists - handle unordered lists
	const listRegex = /((?:^\- .+(?:\n|$))+)/gm;
	html = html.replace(listRegex, (listBlock) => {
		const items = listBlock.trim().split('\n').filter(line => line.trim());
		let listHtml = '<ul class="list-disc list-inside space-y-2 my-6">';
		items.forEach(item => {
			const content = item.replace(/^\- /, '').trim();
			listHtml += `<li>${content}</li>`;
		});
		listHtml += '</ul>';
		return listHtml;
	});

	// Blockquotes
	html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-accent pl-6 py-2 my-6 italic text-ink/80">$1</blockquote>');

	// Paragraphs
	const blockTags = /^<(h[1-6]|ul|ol|table|blockquote|hr|div|section|details|nav|figure)/i;
	const paragraphs = html.split(/\n\n+/);
	html = paragraphs.map(para => {
		para = para.trim();
		if (!para) return '';
		if (para.match(blockTags)) return para;
		if (para.includes('<ul>') || para.includes('<table>')) return para;
		return `<p class="mb-4 leading-relaxed">${para}</p>`;
	}).join('\n');

	// Clean up multiple newlines
	html = html.replace(/\n{3,}/g, '\n\n');

	return html.trim();
}
