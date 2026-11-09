import { posts } from "virtual:posts";
import PostList from "@/components/PostList";
import SectionHeading from "@/components/SectionHeading";
import { seoMeta } from "@/lib/seo";

const description =
	"Technical writing on distributed systems, backend engineering, and Linux internals — tracing, webhooks, rate limiting, migrations, and recovery guides.";

export const meta = () =>
	seoMeta({
		title: "Posts — Systems, Backend & Linux",
		description,
		path: "/posts",
	});

const PostsPage = () => (
	<section className="flex flex-col gap-4">
		<div className="flex items-center justify-between gap-2">
			<SectionHeading title="Posts" as="h1" />
		</div>

		{posts.length === 0 ? (
			<div className="text-(--gb-fg2)">No posts published yet.</div>
		) : (
			<PostList posts={posts} />
		)}
	</section>
);

export default PostsPage;
