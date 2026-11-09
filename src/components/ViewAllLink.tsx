import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface ViewAllLinkProps {
	href: string;
	label?: string;
}

const ViewAllLink = ({ href, label = "View all" }: ViewAllLinkProps) => (
	<Link
		to={href}
		className="showMore-btn group block w-full rounded-lg px-2 py-1.5 transition-transform duration-100 select-none active:scale-[0.97]"
	>
		<span className="flex items-center justify-center gap-1.5 text-sm font-medium">
			{label}
			<ArrowRight className="size-3.5" />
		</span>
	</Link>
);

export default ViewAllLink;
