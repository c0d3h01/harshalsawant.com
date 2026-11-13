import { posts } from "virtual:posts";
import PostList from "@/components/PostList";
import SectionHeader from "@/components/SectionHeader";

const VISIBLE_POST_COUNT = 3;

const PostsSection = () => {
	const visiblePosts = posts.slice(0, VISIBLE_POST_COUNT);

	return (
		<section id="writing" className="section">
			<div className="container-page">
				<SectionHeader
					index="03 — Writing"
					title="Notes from the backend."
					description="Long-form write-ups on distributed systems, Linux internals, and the debugging sessions that taught me something."
					action={{ href: "/posts", label: "All writing" }}
				/>

				{posts.length === 0 ? (
					<p className="text-muted">No posts published yet.</p>
				) : (
					<PostList posts={visiblePosts} />
				)}
			</div>
		</section>
	);
};

export default PostsSection;
