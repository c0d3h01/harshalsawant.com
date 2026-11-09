import { posts } from "virtual:posts";
import PostList from "@/components/PostList";
import SectionHeading from "@/components/SectionHeading";
import ViewAllLink from "@/components/ViewAllLink";

const VISIBLE_POST_COUNT = 2;

const PostsSection = () => {
	const visiblePosts = posts.slice(0, VISIBLE_POST_COUNT);

	return (
		<section id="posts" className="section-fluid flex flex-col gap-3">
			<SectionHeading title="Posts" />

			{posts.length === 0 ? (
				<div className="text-(--gb-fg2)">No posts published yet.</div>
			) : (
				<PostList posts={visiblePosts} />
			)}

			{posts.length > VISIBLE_POST_COUNT && (
				<ViewAllLink href="/posts" label="View all posts" />
			)}
		</section>
	);
};

export default PostsSection;
