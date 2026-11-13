import { Link } from "react-router";
import { seoMeta } from "@/lib/seo";

export const meta = () =>
	seoMeta({
		title: "Page not found",
		description: "This page doesn't exist or may have been moved.",
		path: "/404",
		noindex: true,
	});

export default function NotFound() {
	return (
		<div className="container-page flex min-h-[70svh] flex-col justify-center py-20">
			<p className="eyebrow">404</p>
			<h1 className="mt-3 font-display text-[clamp(3rem,10vw,6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink">
				Page not found.
			</h1>
			<p className="mt-4 max-w-md text-muted">
				This page doesn't exist, or it moved somewhere else.
			</p>
			<div className="mt-7 flex flex-wrap gap-2.5">
				<Link to="/" className="btn btn-primary">
					Go home
				</Link>
				<Link to="/projects" className="btn btn-secondary">
					See projects
				</Link>
			</div>
		</div>
	);
}
