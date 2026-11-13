import type { ReactNode } from "react";

interface PageHeaderProps {
	eyebrow: string;
	title: string;
	description?: string;
	children?: ReactNode;
}

const PageHeader = ({
	eyebrow,
	title,
	description,
	children,
}: PageHeaderProps) => (
	<header className="max-w-4xl pb-10 pt-12 sm:pb-14 sm:pt-16">
		<p className="eyebrow">{eyebrow}</p>
		<h1 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
			{title}
		</h1>
		{description && (
			<p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
				{description}
			</p>
		)}
		{children}
	</header>
);

export default PageHeader;
