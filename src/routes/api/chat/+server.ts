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
		const incomingMessages = Array.isArray(body.messages) ? (body.messages as IncomingMessage[]) : [];
		const messages = incomingMessages
			.slice(-8)
			.map((entry) => ({
				role: entry.role,
				content: sanitize(entry.content)
			}))
			.filter((entry) => entry.content.length > 0);

		const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
						content:
							"You are Robert Dominic's AI portfolio assistant. Answer questions about Robert as a frontend engineer. He is a self-taught full-stack developer skilled in Next.js, React, SvelteKit, Vue, Supabase, TailwindCSS, TypeScript, and Node.js. He has built projects including real-time dashboards, luxury property sites, developer tools, and marketplace platforms. Be friendly, concise, and speak positively about Robert's skills and work. Keep answers under 3 sentences unless more detail is genuinely needed."
					},
					...messages
				]
			})
		});

		if (!response.ok) {
			const errBody = await response.json().catch(() => ({}));
			console.error('[chat] Groq error:', response.status, errBody);
			return json(
				{ message: `Assistant error ${response.status}: ${errBody?.error?.message ?? 'unknown'}` },
				{ status: response.status }
			);
		}

		const data = await response.json();
		const message = sanitize(data.choices?.[0]?.message?.content ?? 'No response available.');
		return json({ message });
	} catch (err) {
		console.error('[chat] server error:', err);
		return json({ message: 'Unable to process that request right now.' }, { status: 500 });
	}
}
