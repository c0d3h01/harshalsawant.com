import type { ComponentType } from "react";

export type IconComponent = ComponentType<{ className?: string }>;

interface Profile {
	name: string;
	shortName: string;
	bio: string;
	location: string;
	githubUsername: string;
	twitterHandle: string;
	linkedinSlug: string;
	instagram: string;
	codeforcesUsername: string;
	calComUsername: string;
	email: string;
	aboutHtml: string;
}

export const profile: Profile = {
	name: "Harshal Sawant",
	shortName: "Harshal",
	bio: "Software Engineer",
	location: "Mumbai, India",
	githubUsername: "c0d3h01",
	twitterHandle: "haarshalsawant",
	linkedinSlug: "haarshalsawant",
	instagram: "haarshalsawant",
	codeforcesUsername: "c0d3h01",
	calComUsername: "harshalsawant",
	email: "harshalsawant.dev@gmail.com",
	aboutHtml: `
		<p>I'm Harshal Sawant, a backend engineer based in Mumbai, India. I build fast backend services, distributed systems, and developer tools, mostly in Go.</p>
		<p>I like the parts most people ignore: how the operating system schedules work, how memory gets used, and what happens to a system when it's under heavy load.</p>
	`,
};

export const profileAvatarUrl = "/images/avatar.png";

export const resumeFilePath = "/docs/Harshal_Sawant_Resume.pdf";

export const siteUrl = "https://harshalsawant.com";

export const defaultOgImage = "/opengraph-image.png";

export interface PostMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
}

export type ProjectStatus = "active" | "building" | "archived";

export interface Project {
	slug: string;
	title: string;
	status: ProjectStatus;
	description: string;
	highlights: string[];
	liveUrl: string;
	githubUrl: string;
	techStack: string[];
	banner: {
		src: string;
		width: number;
		height: number;
	};
}

export const projects: Project[] = [
	{
		slug: "harustream",
		title: "HaruStream",
		status: "active",
		description:
			"A multi-provider streaming aggregator — browse trending, top-rated, and popular movies/series pulled from 15+ provider sources, with search and a personal library.",
		highlights: [
			"Built as a single Next.js 16 App Router app that fetches directly from 15+ provider channels, avoiding a separate API layer or Node sidecar.",
			"Video playback handled with Vidstack, backed by axios and cheerio for provider data fetching and Zod for validated data shapes.",
			"Architected with an eye toward open-sourcing for external contributors, using JioHotstar's web app as an architecture reference point.",
		],
		liveUrl: "",
		githubUrl: "https://github.com/harusharu/harustream",
		techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
		banner: {
			src: "/images/banners/projects.gif",
			width: 500,
			height: 333,
		},
	},
	{
		slug: "termchat",
		title: "TermChat",
		status: "building",
		description:
			"Real-time group chat in your terminal — a lightweight TCP server broadcasts every message to all connected clients instantly, no accounts required.",
		highlights: [
			"Built a real-time terminal UI chat client in Rust with Ratatui and crossterm, rendering a split-pane layout (chat history, live user list, input box).",
			"Implemented async TCP networking on Tokio with a custom framing codec (tokio-util) for concurrent, many-to-many message broadcasting.",
			"Added structured logging and robust error handling with tracing and anyhow, including a panic hook that restores terminal state on crash.",
		],
		liveUrl: "",
		githubUrl: "https://github.com/harusharu/termchat",
		techStack: ["Rust", "Tokio", "Ratatui"],
		banner: {
			src: "/images/banners/projects.gif",
			width: 500,
			height: 333,
		},
	},
	{
		slug: "androidtweaker",
		title: "androidtweaker",
		status: "active",
		description:
			"Built and maintained a shell-driven Android optimization toolkit for rooted devices, focused on runtime tuning, repeatable tweak workflows, and easier long-term maintenance.",
		highlights: [
			"Built a shell-first automation workflow to apply performance tweaks consistently on rooted Android devices.",
			"Added repeatable profiles for CPU, memory, and background-task behavior to reduce manual trial-and-error.",
			"Kept the toolkit modular so tweaks can be added or removed safely during long-term maintenance.",
		],
		liveUrl: "",
		githubUrl: "https://github.com/c0d3h01/androidtweaker",
		techStack: ["Shell scripts", "Android kernel", "Performance Tuning"],
		banner: {
			src: "/images/banners/projects.gif",
			width: 500,
			height: 333,
		},
	},
	{
		slug: "coretaskoptimizer",
		title: "coretaskoptimizer",
		status: "active",
		description:
			"Implemented a native C++ root module that applies CPU affinity, scheduler policy, and I/O priority to critical Android system tasks with low-overhead boot-time execution.",
		highlights: [
			"Focused on critical system process prioritization to keep foreground responsiveness stable under load.",
			"Designed the rule pipeline for low-level Linux controls such as scheduler policy and I/O priority.",
			"Uses runtime CPU topology detection to pin critical threads on performance versus efficiency cores.",
		],
		liveUrl: "",
		githubUrl: "https://github.com/c0d3h01/coretaskoptimizer",
		techStack: [
			"C++",
			"Android kernel",
			"Kernel Optimization",
			"CPU task priotizer",
		],
		banner: {
			src: "/images/banners/projects.gif",
			width: 500,
			height: 333,
		},
	},
];

export interface Experience {
	role: string;
	company: string;
	location: string;
	duration: string;
	isCurrent: boolean;
	highlights: string[];
}

export const experiences: Experience[] = [
	{
		role: "OSS Developer",
		company: "Freelance",
		location: "Remote",
		duration: "2024 - Present",
		isCurrent: true,
		highlights: [
			"Built backend services in Rust using Actix Web, focused on fast and reliable requests.",
			"Built REST APIs and backends, handling routing, auth, validation, and errors.",
			"Used PostgreSQL, Redis, Docker, and CI/CD to keep services stable and easy to maintain.",
		],
	},
];

export interface SocialLink {
	name: string;
	href: string;
	icon: IconComponent;
}
