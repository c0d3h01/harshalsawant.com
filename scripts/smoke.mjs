#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const root = resolve("build/client");
const failures = [];

const check = (condition, label) => {
	if (condition) {
		console.log(`✓ ${label}`);
		return;
	}

	failures.push(label);
	console.error(`✗ ${label}`);
};

if (!existsSync(join(root, "index.html"))) {
	console.error("Missing build/client/index.html. Run `pnpm build` first.");
	process.exit(1);
}

const redirects = readFileSync(join(root, "_redirects"), "utf8")
	.split("\n")
	.map((line) => line.trim())
	.filter((line) => line && !line.startsWith("#"))
	.map((line) => {
		const [from, to, status] = line.split(/\s+/);
		return { from, to, status: Number(status) || 302 };
	});

const matchRedirect = (pathname) => {
	for (const rule of redirects) {
		const names = [];
		const pattern = rule.from.replace(/:([^/]+)/g, (_, name) => {
			names.push(name);
			return "([^/]+)";
		});

		const match = pathname.match(new RegExp(`^${pattern}$`));
		if (!match) continue;

		let index = 1;
		const location = rule.to.replace(/:([^/]+)/g, () => {
			const value = match[index];
			index += 1;
			return value;
		});

		return { location, status: rule.status };
	}

	return null;
};

const contentTypes = {
	".css": "text/css; charset=utf-8",
	".gif": "image/gif",
	".html": "text/html; charset=utf-8",
	".ico": "image/x-icon",
	".js": "text/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".pdf": "application/pdf",
	".png": "image/png",
	".svg": "image/svg+xml",
	".txt": "text/plain; charset=utf-8",
	".woff2": "font/woff2",
	".xml": "application/xml; charset=utf-8",
};

const resolveAsset = (pathname) => {
	const decoded = decodeURIComponent(pathname);
	const candidate = join(root, decoded === "/" ? "/index.html" : decoded);

	if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
		return { file: join(root, "404.html"), status: 404 };
	}

	let file = candidate;
	if (existsSync(file) && statSync(file).isDirectory()) {
		file = join(file, "index.html");
	} else if (!extname(file) && existsSync(`${file}/index.html`)) {
		file = `${file}/index.html`;
	}

	if (!existsSync(file)) {
		return { file: join(root, "404.html"), status: 404 };
	}

	return { file, status: 200 };
};

const server = createServer((request, response) => {
	const url = new URL(request.url ?? "/", "http://localhost");
	const redirect = matchRedirect(url.pathname);

	if (redirect) {
		response.writeHead(redirect.status, { Location: redirect.location });
		response.end();
		return;
	}

	const asset = resolveAsset(url.pathname);
	response.writeHead(asset.status, {
		"Content-Type":
			contentTypes[extname(asset.file)] ?? "application/octet-stream",
	});
	response.end(readFileSync(asset.file));
});

await new Promise((resolveListen) =>
	server.listen(0, "127.0.0.1", resolveListen),
);
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;

const get = (path) => fetch(`${origin}${path}`, { redirect: "manual" });
const getText = async (path) => (await get(path)).text();

const pageChecks = [
	{
		path: "/",
		label: "home",
		includes: ["hold up under load", 'id="main"', "Selected work"],
	},
	{
		path: "/projects",
		label: "projects index",
		includes: ["Selected work.", "HaruStream"],
	},
	{
		path: "/posts",
		label: "posts index",
		includes: ["Notes from the backend.", "Distributed Tracing"],
	},
	{
		path: "/experience",
		label: "experience",
		includes: ["A short history.", "OSS Developer"],
	},
	{
		path: "/404",
		label: "404 page",
		includes: ["Page not found."],
	},
];

for (const page of pageChecks) {
	const response = await get(page.path);
	const html = await response.text();

	check(response.status === 200, `${page.label} returns 200`);
	check(
		page.includes.every((text) => html.includes(text)),
		`${page.label} has expected content`,
	);
	check(html.includes("site-header"), `${page.label} has the site header`);
	check(html.includes("skip-link"), `${page.label} has a skip link`);
	check(
		html.includes("viewport-fit=cover"),
		`${page.label} has a safe-area viewport`,
	);
}

const projectSlugs = readdirSync(join(root, "projects"), {
	withFileTypes: true,
})
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

check(projectSlugs.length > 0, "projects are prerendered");

for (const slug of projectSlugs) {
	const response = await get(`/projects/${slug}`);
	const html = await response.text();
	check(response.status === 200, `project ${slug} returns 200`);
	check(html.includes("What it does"), `project ${slug} has detail content`);
}

const postSlugs = readdirSync(join(root, "posts"), { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

check(postSlugs.length > 0, "posts are prerendered");

for (const slug of postSlugs) {
	const response = await get(`/posts/${slug}`);
	const html = await response.text();
	check(response.status === 200, `post ${slug} returns 200`);
	check(html.includes("post-prose"), `post ${slug} has prose content`);
}

const missing = await get("/this-page-does-not-exist");
const missingHtml = await missing.text();
check(missing.status === 404, "unknown route returns 404");
check(
	missingHtml.includes("Page not found."),
	"unknown route renders the 404 page",
);

for (const redirect of [
	{ path: "/home", location: "/", status: 301 },
	{ path: "/blog", location: "/posts", status: 301 },
	{
		path: "/blog/grub-iso-boot",
		location: "/posts/grub-iso-boot",
		status: 301,
	},
	{
		path: "/resume",
		location: "/docs/Harshal_Sawant_Resume.pdf",
		status: 302,
	},
]) {
	const response = await get(redirect.path);
	check(
		response.status === redirect.status,
		`${redirect.path} redirects with ${redirect.status}`,
	);
	check(
		response.headers.get("location") === redirect.location,
		`${redirect.path} points to ${redirect.location}`,
	);
}

const sitemap = await get("/sitemap.xml");
const sitemapText = await sitemap.text();
check(sitemap.status === 200, "sitemap returns 200");
check(sitemapText.includes("<urlset"), "sitemap is valid XML");
check(
	sitemapText.includes("https://harshalsawant.com/projects/harustream"),
	"sitemap lists project pages",
);

const robots = await getText("/robots.txt");
check(robots.includes("Sitemap:"), "robots.txt points to the sitemap");

const llms = await getText("/llms.txt");
check(llms.includes("Harshal Sawant"), "llms.txt has profile content");

const headers = readFileSync(join(root, "_headers"), "utf8");
check(headers.includes("Content-Security-Policy"), "_headers sets a CSP");
check(
	headers.includes("Cache-Control: public, max-age=31536000"),
	"_headers caches hashed assets",
);

server.close();

if (failures.length > 0) {
	console.error(`\n${failures.length} smoke check(s) failed.`);
	process.exit(1);
}

console.log(
	`\nAll smoke checks passed (${projectSlugs.length} projects, ${postSlugs.length} posts).`,
);
