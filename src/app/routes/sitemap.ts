import { sitemapXml } from "@/lib/seo-files.server";

export const loader = () =>
	new Response(sitemapXml(), {
		headers: { "Content-Type": "application/xml" },
	});
