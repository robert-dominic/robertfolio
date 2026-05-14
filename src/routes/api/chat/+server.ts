import { json } from '@sveltejs/kit';
import { GROQ_API_KEY } from '$env/static/private';

type IncomingMessage = {
	role: 'user' | 'assistant';
	content: string;
};

const sanitize = (value: string) => value.replace(/[<>]/g, '').trim();

export async function POST({ request, fetch }) {
	try {
		const body = await request.json();

		const incomingMessages = Array.isArray(body.messages)
			? (body.messages as IncomingMessage[])
			: [];

		const pageContent =
			typeof body.pageContent === 'string'
				? sanitize(body.pageContent).slice(0, 12000)
				: '';

		const messages = incomingMessages
			.slice(-8)
			.map((entry) => ({
				role: entry.role,
				content: sanitize(entry.content)
			}))
			.filter((entry) => entry.content.length > 0);

		const systemPrompt = `
You are Nova, the AI assistant on Robert Dominic's portfolio.

ABOUT ROBERT:
Robert Dominic, also known as WebNova, is a 19-year-old self-taught full-stack engineer based in Africa. He runs WebNova Studio remotely and focuses on building modern web experiences, collaborating with teams, gaining experience, and improving through real-world projects.

TECHNICAL SKILLS:
His primary stack includes Next.js, React, TypeScript, Firebase, Node.js, TailwindCSS, Shadcn UI, Prisma, MongoDB, Supabase, Vue, and SvelteKit.

EXPERIENCE:
- Learned frontend development and algorithms through freeCodeCamp
- Participated in multiple hackathons over the course of one year
- Currently participating in the HNG internship, one of the most competitive developer internships in Africa
- Has built encrypted messaging apps, Chrome extensions, AI-integrated projects, and full-stack web applications

CERTIFICATIONS:
- freeCodeCamp certifications
- Queen Arit's circle hackathon certificate

PERSONALITY & APPROACH:
Robert is analytical, calm, strategic, and product-minded. He cares deeply about code quality, user experience, structure, and solving problems thoughtfully. He often approaches thinking strategically and references analytical anime characters like Ayanokoji, Shikamaru, and L as personal inspiration for calm and calculated thinking.

ONLINE PRESENCE:
- Email Address: devrobertcodes@gmail.com
- X(formerly twitter): @_devrobert
- GitHub username: robert-dominic
- Brand/Studio: WebNova Studio

RESPONSE RULES:
- Speak naturally and warmly
- Do not sound corporate or robotic
- Keep answers concise unless more detail is needed
- Speak like someone familiar with Robert
- Never invent skills, projects, or experiences
- Use the current portfolio page content to answer questions accurately
- If information is missing, say:
"I don't have that detail, but you can reach Robert directly."

CURRENT PORTFOLIO PAGE CONTENT:
${pageContent}
`;

		const response = await fetch(
			'https://api.groq.com/openai/v1/chat/completions',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${GROQ_API_KEY}`
				},
				body: JSON.stringify({
					model: 'llama-3.3-70b-versatile',
					messages: [
						{
							role: 'system',
							content: systemPrompt
						},
						...messages
					],
					temperature: 0.7,
					max_tokens: 500
				})
			}
		);

		if (!response.ok) {
			const errBody = await response.json().catch(() => ({}));

			console.error('[chat] Groq error:', response.status, errBody);

			return json(
				{
					message: `Assistant error ${response.status}: ${errBody?.error?.message ?? 'unknown'
						}`
				},
				{ status: response.status }
			);
		}

		const data = await response.json();

		const message = sanitize(
			data.choices?.[0]?.message?.content ?? 'No response available.'
		);

		return json({ message });
	} catch (err) {
		console.error('[chat] server error:', err);

		return json(
			{
				message: 'Unable to process that request right now.'
			},
			{ status: 500 }
		);
	}
}