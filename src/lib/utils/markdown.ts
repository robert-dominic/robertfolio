const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const sanitizeUrl = (value: string) => {
	try {
		const url = new URL(value);
		return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
	} catch {
		return null;
	}
};

const renderInlineMarkdown = (value: string) => {
	let output = escapeHtml(value);

	output = output.replace(/`([^`]+)`/g, '<code>$1</code>');
	output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	output = output.replace(/\*([^*]+)\*/g, '<em>$1</em>');
	output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, href: string) => {
		const safeHref = sanitizeUrl(href);
		return safeHref
			? `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">${label}</a>`
			: label;
	});

	return output;
};

export const renderMarkdown = (value: string) => {
	const lines = value.replace(/\r\n/g, '\n').trim().split('\n');
	const blocks: string[] = [];
	let paragraph: string[] = [];
	let listType: 'ul' | 'ol' | null = null;
	let listItems: string[] = [];

	const flushParagraph = () => {
		if (paragraph.length === 0) return;
		blocks.push(`<p>${renderInlineMarkdown(paragraph.join(' '))}</p>`);
		paragraph = [];
	};

	const flushList = () => {
		if (!listType || listItems.length === 0) return;
		blocks.push(`<${listType}>${listItems.join('')}</${listType}>`);
		listType = null;
		listItems = [];
	};

	for (const rawLine of lines) {
		const line = rawLine.trim();

		if (!line) {
			flushParagraph();
			flushList();
			continue;
		}

		const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
		if (headingMatch) {
			flushParagraph();
			flushList();
			const level = headingMatch[1].length;
			blocks.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`);
			continue;
		}

		const unorderedMatch = line.match(/^[-*]\s+(.*)$/);
		if (unorderedMatch) {
			flushParagraph();
			if (listType && listType !== 'ul') {
				flushList();
			}
			listType = 'ul';
			listItems.push(`<li>${renderInlineMarkdown(unorderedMatch[1])}</li>`);
			continue;
		}

		const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
		if (orderedMatch) {
			flushParagraph();
			if (listType && listType !== 'ol') {
				flushList();
			}
			listType = 'ol';
			listItems.push(`<li>${renderInlineMarkdown(orderedMatch[1])}</li>`);
			continue;
		}

		if (listType) {
			flushList();
		}
		paragraph.push(line);
	}

	flushParagraph();
	flushList();

	return blocks.join('');
};
