import { postBodies } from "virtual:post-bodies";
import { posts } from "virtual:posts";
import { ArrowLeft } from "lucide-react";
import {
	isRouteErrorResponse,
	Link,
	useParams,
	useRouteError,
} from "react-router";
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
				title="Post not found."
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
		<div className="container-page pb-20 pt-8 sm:pb-24 sm:pt-10">
			<JsonLd data={blogPostingJsonLd} />
			<JsonLd data={breadcrumbJsonLd} />

			<Link to="/posts" className="section-link">
				<ArrowLeft aria-hidden="true" />
				All writing
			</Link>

			<article className="mt-8">
				<p className="eyebrow">
					Writing ·{" "}
					<time dateTime={post.date}>{formatDate(post.date, "long")}</time>
				</p>

				<h1 className="mt-4 max-w-4xl font-display text-[clamp(2.2rem,5.5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
					{post.title}
				</h1>

				<p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
					{post.description}
				</p>

				<div className="my-10 h-px bg-line" />

				<div
					className="post-prose"
					dangerouslySetInnerHTML={{ __html: postBodies[post.slug] ?? "" }}
				/>
			</article>

			<div className="mt-14 border-t border-line pt-6">
				<Link to="/posts" className="section-link">
					<ArrowLeft aria-hidden="true" />
					Back to all writing
				</Link>
			</div>
		</div>
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
			title="Something went wrong."
			message={message}
			href="/posts"
			linkLabel="View all posts"
		/>
	);
};

export default PostPage;
