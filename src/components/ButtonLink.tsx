import type { ReactNode } from "react";

interface ButtonLinkProps {
	href: string;
	children: ReactNode;
	ariaLabel?: string;
	target?: "_blank" | "_self";
	rel?: string;
	className?: string;
}

const ButtonLink = ({
	href,
	children,
	ariaLabel,
	target = "_self",
	rel,
	className,
}: ButtonLinkProps) => {
	const resolvedClassName = [
		"btn cursor-pointer w-fit select-none flex flex-row gap-1.5 items-center px-2 py-1 rounded-md transition-transform duration-100 active:scale-[0.97]",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<a
			href={href}
			aria-label={ariaLabel}
			target={target}
			rel={target === "_blank" ? (rel ?? "noopener noreferrer") : undefined}
			className={resolvedClassName}
		>
			{children}
		</a>
	);
};

export default ButtonLink;
