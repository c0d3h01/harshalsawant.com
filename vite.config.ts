import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import {
	getPostFilePaths,
	getPosts,
	getRenderedPosts,
} from "./src/lib/posts.ts";

const VIRTUAL_POSTS = "virtual:posts";
const RESOLVED_POSTS = `\0${VIRTUAL_POSTS}`;
const VIRTUAL_POST_BODIES = "virtual:post-bodies";
const RESOLVED_POST_BODIES = `\0${VIRTUAL_POST_BODIES}`;

const postsData = (): Plugin => ({
	name: "posts-data",
	resolveId(id) {
		if (id === VIRTUAL_POSTS) return RESOLVED_POSTS;
		if (id === VIRTUAL_POST_BODIES) return RESOLVED_POST_BODIES;
	},
	async load(id) {
		if (id === RESOLVED_POSTS) {
			for (const file of getPostFilePaths()) {
				this.addWatchFile(file);
			}

			return `export const posts = ${JSON.stringify(getPosts())};`;
		}

		if (id === RESOLVED_POST_BODIES) {
			for (const file of getPostFilePaths()) {
				this.addWatchFile(file);
			}

			const bodies = Object.fromEntries(
				(await getRenderedPosts()).map(({ slug, html }) => [slug, html]),
			);

			return `export const postBodies = ${JSON.stringify(bodies)};`;
		}
	},
});

interface RedirectRule {
	from: string;
	to: string;
	status: number;
}

const readRedirects = (): RedirectRule[] =>
	readFileSync(join(process.cwd(), "public/_redirects"), "utf8")
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith("#"))
		.map((line) => {
			const [from, to, status] = line.split(/\s+/);
			return { from, to, status: Number(status) || 302 };
		});

const matchRedirect = (pathname: string) => {
	const requestParts = pathname.split("/").filter(Boolean);

	for (const rule of readRedirects()) {
		const ruleParts = rule.from.split("/").filter(Boolean);

		if (ruleParts.length !== requestParts.length) {
			continue;
		}

		const params = new Map<string, string>();
		let matches = true;

		for (const [index, part] of ruleParts.entries()) {
			const requestPart = requestParts[index];

			if (part.startsWith(":")) {
				params.set(part.slice(1), requestPart);
				continue;
			}

			if (part !== requestPart) {
				matches = false;
				break;
			}
		}

		if (!matches) {
			continue;
		}

		let target = rule.to;

		for (const [name, value] of params) {
			target = target.replace(`:${name}`, value);
		}

		return { target, status: rule.status };
	}

	return null;
};

const devRedirects = (): Plugin => ({
	name: "dev-redirects",
	apply: "serve",
	configureServer: {
		order: "pre",
		handler(server) {
			server.middlewares.use((req, res, next) => {
				const [pathname, search] = (req.url ?? "/").split("?");
				const redirect = matchRedirect(pathname);

				if (!redirect) {
					next();
					return;
				}

				res.writeHead(redirect.status, {
					Location: search ? `${redirect.target}?${search}` : redirect.target,
				});
				res.end();
			});
		},
	},
});

export default defineConfig({
	appType: "mpa",
	plugins: [tailwindcss(), devRedirects(), reactRouter(), postsData()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
