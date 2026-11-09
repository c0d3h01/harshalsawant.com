import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { PostMeta } from "../content/index.ts";
import { toIsoDate } from "./utils.ts";

const postsDirectory = path.join(process.cwd(), "src/content/posts");
const markdownProcessor = remark().use(remarkGfm).use(remarkHtml);

export interface Post extends PostMeta {
	content: string;
}

export interface RenderedPost extends PostMeta {
	html: string;
}

const byDateDesc = (a: PostMeta, b: PostMeta) =>
	new Date(b.date).getTime() - new Date(a.date).getTime();

export const getPostFilePaths = (): string[] => {
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	return fs
		.readdirSync(postsDirectory)
		.filter((fileName) => fileName.endsWith(".md"))
		.map((fileName) => path.join(postsDirectory, fileName));
};

const parsePost = (filePath: string): Post => {
	const slug = path.basename(filePath).replace(/\.md$/, "");

	try {
		const source = fs.readFileSync(filePath, "utf8");
		const { data, content } = matter(source);

		return {
			slug,
			title: typeof data.title === "string" && data.title ? data.title : slug,
			description: typeof data.description === "string" ? data.description : "",
			date: toIsoDate(data.date),
			content,
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(`[posts] Failed to parse "${filePath}": ${message}`);
	}
};

const loadPosts = (): Post[] => getPostFilePaths().map(parsePost);

export const getPosts = (): PostMeta[] =>
	loadPosts()
		.map((post) => ({
			slug: post.slug,
			title: post.title,
			description: post.description,
			date: post.date,
		}))
		.sort(byDateDesc);

export const renderMarkdown = async (markdown: string): Promise<string> => {
	if (!markdown) {
		return "";
	}

	const processed = await markdownProcessor.process(markdown);
	return processed.toString();
};

export const getRenderedPosts = async (): Promise<RenderedPost[]> =>
	Promise.all(
		loadPosts()
			.sort(byDateDesc)
			.map(async ({ content, ...post }) => ({
				...post,
				html: await renderMarkdown(content),
			})),
	);
