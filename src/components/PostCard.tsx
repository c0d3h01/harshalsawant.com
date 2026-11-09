import { Link } from "react-router";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
	title: string;
	description: string;
	href: string;
	date: string;
}

const PostCard = ({ title, description, href, date }: PostCardProps) => (
	<Link to={href} className="post-card group block">
		<div className="flex flex-col gap-1">
			<div className="flex items-baseline justify-between gap-3">
				<h2 className="wrap-break-word text-base font-semibold text-(--gb-fg0) sm:text-lg">
					{title}
				</h2>
				<time
					dateTime={date}
					className="mono-label tnum shrink-0 whitespace-nowrap"
				>
					{formatDate(date)}
				</time>
			</div>
			<p className="wrap-break-word text-(--gb-fg2)">{description}</p>
		</div>
	</Link>
);

export default PostCard;
