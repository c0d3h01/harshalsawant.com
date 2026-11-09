import type { MetaDescriptor } from "react-router";
import { defaultOgImage, profile, siteUrl } from "@/content";

interface SeoOptions {
	title: string;
	description: string;
	path: string;
	image?: string;
	type?: "website" | "article";
	publishedTime?: string;
	absoluteTitle?: boolean;
	noindex?: boolean;
}

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

export const seoMeta = ({
	title,
	description,
	path,
	image = defaultOgImage,
	type = "website",
	publishedTime,
	absoluteTitle = false,
	noindex = false,
}: SeoOptions): MetaDescriptor[] => {
	const fullTitle = absoluteTitle ? title : `${title} | ${profile.name}`;
	const url = absoluteUrl(path);
	const imageUrl = absoluteUrl(image);

	return [
		{ title: fullTitle },
		{ name: "description", content: description },
		{ tagName: "link", rel: "canonical", href: url },
		...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
		{ property: "og:type", content: type },
		{ property: "og:site_name", content: profile.name },
		{ property: "og:locale", content: "en_IN" },
		{ property: "og:title", content: fullTitle },
		{ property: "og:description", content: description },
		{ property: "og:url", content: url },
		{ property: "og:image", content: imageUrl },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:image:alt", content: fullTitle },
		...(publishedTime
			? [
					{
						property: "article:published_time",
						content: publishedTime,
					},
					{ property: "article:author", content: profile.name },
				]
			: []),
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: imageUrl },
		{ name: "twitter:creator", content: `@${profile.twitterHandle}` },
	];
};
