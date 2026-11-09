/// <reference types="vite/client" />

declare module "virtual:posts" {
	import type { PostMeta } from "@/content";

	export const posts: PostMeta[];
}

declare module "virtual:post-bodies" {
	export const postBodies: Record<string, string>;
}
