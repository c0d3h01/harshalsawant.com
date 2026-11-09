import { Link } from "react-router";

interface NotFoundBlockProps {
	title: string;
	message: string;
	href: string;
	linkLabel: string;
}

const NotFoundBlock = ({
	title,
	message,
	href,
	linkLabel,
}: NotFoundBlockProps) => (
	<div className="flex flex-col gap-3 py-12">
		<h1 className="text-xl font-medium text-(--gb-fg0)">{title}</h1>
		<p className="text-sm text-(--gb-fg2)">{message}</p>
		<Link
			to={href}
			className="text-(--accent) text-sm underline underline-offset-4"
		>
			{linkLabel}
		</Link>
	</div>
);

export default NotFoundBlock;
