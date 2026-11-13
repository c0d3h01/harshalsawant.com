import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
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
	buildEnd({ reactRouterConfig }) {
		const clientDirectory = join(reactRouterConfig.buildDirectory, "client");
		const source = join(clientDirectory, "404/index.html");

		if (!existsSync(source)) {
			throw new Error(`Missing ${source}: the 404 page was not prerendered.`);
		}

		copyFileSync(source, join(clientDirectory, "404.html"));
	},
} satisfies Config;
