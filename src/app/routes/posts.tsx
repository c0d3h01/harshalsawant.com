import { posts } from "virtual:posts";
import PageHeader from "@/components/PageHeader";
import PostList from "@/components/PostList";
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
	<div className="container-page pb-20 sm:pb-24">
		<PageHeader
			eyebrow="Writing"
			title="Notes from the backend."
			description={description}
		/>

		{posts.length === 0 ? (
			<p className="text-muted">No posts published yet.</p>
		) : (
			<PostList posts={posts} />
		)}
	</div>
);

export default PostsPage;
