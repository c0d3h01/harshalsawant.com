import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router";
import BrandMark from "@/components/BrandMark";
import ThemeToggle from "@/components/ThemeToggle";
import { resumeFilePath } from "@/content";

const navItems = [
	{ href: "/projects", label: "Work" },
	{ href: "/posts", label: "Writing" },
	{ href: "/experience", label: "Experience" },
];

const SiteHeader = () => {
	const { pathname } = useLocation();

	return (
		<header className="site-header">
			<div className="container-page site-header-inner">
				<BrandMark />

				<nav
					aria-label="Primary"
					className="hidden items-center gap-0.5 md:flex"
				>
					{navItems.map(({ href, label }) => {
						const active = pathname === href || pathname.startsWith(`${href}/`);

						return (
							<Link
								key={href}
								to={href}
								className="nav-link"
								data-active={active ? "true" : "false"}
								aria-current={active ? "page" : undefined}
							>
								{label}
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-1.5">
					<a
						href={resumeFilePath}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-ghost hidden px-3 sm:inline-flex"
					>
						Résumé
						<ArrowUpRight aria-hidden="true" />
					</a>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};

export default SiteHeader;
