import type { Config } from "@react-router/dev/config";
import { projects } from "./src/content/index.ts";
import { getPosts } from "./src/lib/posts.ts";

export default {
	appDirectory: "src/app",
	ssr: false,
	prerender: [
		"/",
		"/experience",
		"/projects",
		"/posts",
		"/404",
		"/sitemap.xml",
		"/robots.txt",
		"/llms.txt",
		...projects.map((project) => `/projects/${project.slug}`),
		...getPosts().map((post) => `/posts/${post.slug}`),
	],
} satisfies Config;
