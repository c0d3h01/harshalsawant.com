import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

interface SectionHeaderProps {
	index: string;
	title: string;
	description?: string;
	action?: {
		href: string;
		label: string;
	};
}

const SectionHeader = ({
	index,
	title,
	description,
	action,
}: SectionHeaderProps) => (
	<div className="section-head">
		<div className="max-w-2xl">
			<p className="eyebrow">{index}</p>
			<h2 className="section-title mt-2.5">{title}</h2>
			{description && <p className="mt-3 max-w-xl text-muted">{description}</p>}
		</div>

		{action && (
			<Link to={action.href} className="section-link">
				{action.label}
				<ArrowUpRight aria-hidden="true" />
			</Link>
		)}
	</div>
);

export default SectionHeader;
