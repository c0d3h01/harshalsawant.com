import { Mail } from "lucide-react";
import {
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaXTwitter,
} from "react-icons/fa6";
import ButtonLink from "@/components/ButtonLink";
import { profile, type SocialLink } from "@/content";

const socialLinks: SocialLink[] = [
	{
		name: "Email",
		href: `mailto:${profile.email}`,
		icon: Mail,
	},
	{
		name: "GitHub",
		href: `https://github.com/${profile.githubUsername}`,
		icon: FaGithub,
	},
	{
		name: "X (Twitter)",
		href: `https://x.com/intent/follow?screen_name=${profile.twitterHandle}`,
		icon: FaXTwitter,
	},
	{
		name: "LinkedIn",
		href: `https://www.linkedin.com/in/${profile.linkedinSlug}`,
		icon: FaLinkedinIn,
	},
	{
		name: "Instagram",
		href: `https://instagram.com/${profile.instagram}`,
		icon: FaInstagram,
	},
];

const SocialLinks = () => (
	<nav
		aria-label="Social links"
		className="flex flex-wrap justify-center gap-3 pt-1 sm:justify-start"
	>
		{socialLinks.map(({ name, href, icon: Icon }) => (
			<ButtonLink
				key={name}
				ariaLabel={name}
				href={href}
				target={href.startsWith("http") ? "_blank" : "_self"}
				className="social-link relative overflow-visible px-2 py-1.5"
			>
				<Icon className="social-link-icon size-4 shrink-0" />
				<span className="social-link-tag" aria-hidden="true">
					{name}
				</span>
			</ButtonLink>
		))}
	</nav>
);

export default SocialLinks;
