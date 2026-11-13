import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
	title: string;
	description: string;
	href: string;
	date: string;
}

const PostCard = ({ title, description, href, date }: PostCardProps) => (
	<Link to={href} className="post-row">
		<time dateTime={date} className="mono-label tnum">
			{formatDate(date)}
		</time>
		<div>
			<h2 className="post-title">{title}</h2>
			<p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
				{description}
			</p>
		</div>
		<ArrowUpRight aria-hidden="true" className="post-arrow" />
	</Link>
);

export default PostCard;
