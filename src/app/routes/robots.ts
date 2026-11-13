import { robotsTxt } from "@/lib/seo-files.server";

export const loader = () =>
	new Response(robotsTxt(), {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
