import {
	index,
	layout,
	type RouteConfig,
	route,
} from "@react-router/dev/routes";

export default [
	route("sitemap.xml", "routes/sitemap.ts"),
	route("robots.txt", "routes/robots.ts"),
	route("llms.txt", "routes/llms.ts"),
	layout("routes/layout.tsx", [
		index("routes/home.tsx"),
		route("experience", "routes/experience.tsx"),
		route("projects", "routes/projects.tsx"),
		route("projects/:slug", "routes/project.tsx"),
		route("posts", "routes/posts.tsx"),
		route("posts/:slug", "routes/post.tsx"),
		route("*", "routes/not-found.tsx"),
	]),
] satisfies RouteConfig;
