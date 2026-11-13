import { profile } from "@/content";

const footerLinks = [
	{ href: `mailto:${profile.email}`, label: "Email" },
	{ href: `https://github.com/${profile.githubUsername}`, label: "GitHub" },
	{ href: `https://x.com/${profile.twitterHandle}`, label: "X" },
	{
		href: `https://www.linkedin.com/in/${profile.linkedinSlug}`,
		label: "LinkedIn",
	},
];

const SiteFooter = () => {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer">
			<div className="container-page flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="mono-label">
						© {year} {profile.name}
					</p>
					<p className="mt-1.5 text-sm text-muted">
						Backend engineer · {profile.location}
					</p>
				</div>

				<nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
					{footerLinks.map(({ href, label }) => (
						<a
							key={label}
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							className="text-sm text-muted transition-colors hover:text-accent"
						>
							{label}
						</a>
					))}
				</nav>
			</div>
		</footer>
	);
};

export default SiteFooter;
