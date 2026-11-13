import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/content";

interface PostListProps {
	posts: PostMeta[];
}

const PostList = ({ posts }: PostListProps) => (
	<div className="flex flex-col">
		{posts.map((post) => (
			<PostCard
				key={post.slug}
				title={post.title}
				description={post.description}
				href={`/posts/${post.slug}`}
				date={post.date}
			/>
		))}
	</div>
);

export default PostList;
