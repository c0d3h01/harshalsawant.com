import { llmsTxt } from "@/lib/seo-files.server";

export const loader = () =>
	new Response(llmsTxt(), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
