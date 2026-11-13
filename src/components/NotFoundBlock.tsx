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
	<div className="container-page flex min-h-[60svh] flex-col justify-center py-16">
		<p className="eyebrow">Not found</p>
		<h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
			{title}
		</h1>
		<p className="mt-3 max-w-md text-muted">{message}</p>
		<Link to={href} className="btn btn-secondary mt-6 w-fit">
			{linkLabel}
		</Link>
	</div>
);

export default NotFoundBlock;
