import { Mail } from "lucide-react";
import {
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaXTwitter,
} from "react-icons/fa6";
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
	<nav aria-label="Social links" className="flex flex-wrap gap-2">
		{socialLinks.map(({ name, href, icon: Icon }) => {
			const external = href.startsWith("http");

			return (
				<a
					key={name}
					href={href}
					aria-label={name}
					target={external ? "_blank" : undefined}
					rel={external ? "noopener noreferrer" : undefined}
					className="social-icon"
				>
					<Icon aria-hidden="true" />
				</a>
			);
		})}
	</nav>
);

export default SocialLinks;
