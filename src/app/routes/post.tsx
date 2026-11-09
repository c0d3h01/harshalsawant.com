import { postBodies } from "virtual:post-bodies";
import { posts } from "virtual:posts";
import { isRouteErrorResponse, useParams, useRouteError } from "react-router";
import JsonLd from "@/components/JsonLd";
import NotFoundBlock from "@/components/NotFoundBlock";
import { defaultOgImage, profile, siteUrl } from "@/content";
import { seoMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const getPost = (slug: string | undefined) =>
	posts.find((post) => post.slug === slug);

export const meta = ({ params }: { params: { slug?: string } }) => {
	const post = getPost(params.slug);

	if (!post) {
		return seoMeta({
			title: "Post Not Found",
			description: "This post doesn't exist or may have been moved.",
			path: `/posts/${params.slug ?? ""}`,
			noindex: true,
		});
	}

	return seoMeta({
		title: post.title,
		description: post.description,
		path: `/posts/${post.slug}`,
		image: defaultOgImage,
		type: "article",
		publishedTime: post.date,
	});
};

const PostPage = () => {
	const { slug } = useParams();
	const post = getPost(slug);

	if (!post) {
		return (
			<NotFoundBlock
				title="Post not found"
				message="This post doesn't exist or may have been moved."
				href="/posts"
				linkLabel="View all posts"
			/>
		);
	}

	const postUrl = `${siteUrl}/posts/${post.slug}`;

	const blogPostingJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		url: postUrl,
		mainEntityOfPage: postUrl,
		author: {
			"@type": "Person",
			name: profile.name,
			url: siteUrl,
		},
	};

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
			{
				"@type": "ListItem",
				position: 2,
				name: "Posts",
				item: `${siteUrl}/posts`,
			},
			{ "@type": "ListItem", position: 3, name: post.title, item: postUrl },
		],
	};

	return (
		<article className="content-rail flex flex-col gap-4">
			<JsonLd data={blogPostingJsonLd} />
			<JsonLd data={breadcrumbJsonLd} />

			<p className="mono-label tnum">
				By {profile.name} ·{" "}
				<time dateTime={post.date}>{formatDate(post.date, "long")}</time>
			</p>

			<h1 className="wrap-break-word text-2xl font-bold text-(--gb-fg0)">
				{post.title}
			</h1>
			<p className="wrap-break-word text-(--gb-fg2)">{post.description}</p>

			<div
				className="post-prose flex flex-col gap-4"
				dangerouslySetInnerHTML={{ __html: postBodies[post.slug] ?? "" }}
			/>
		</article>
	);
};

export const ErrorBoundary = () => {
	const error = useRouteError();
	const message = isRouteErrorResponse(error)
		? `${error.status} ${error.statusText}`
		: error instanceof Error
			? error.message
			: "Something went wrong";

	return (
		<NotFoundBlock
			title="Something went wrong"
			message={message}
			href="/posts"
			linkLabel="View all posts"
		/>
	);
};

export default PostPage;
