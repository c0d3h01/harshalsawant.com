import { ThemeProvider } from "next-themes";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from "react-router";
import FloatingDock from "@/components/FloatingDock";
import JsonLd from "@/components/JsonLd";
import { profile, profileAvatarUrl, siteUrl } from "@/content";
import { absoluteUrl, seoMeta } from "@/lib/seo";
import "../styles/globals.css";

const siteDescription =
	"I'm Harshal Sawant, a software engineer in Mumbai. This is where I share my projects, experience, and writing on backends and distributed systems in Go.";

const socialUrls = [
	`https://github.com/${profile.githubUsername}`,
	`https://x.com/${profile.twitterHandle}`,
	`https://www.linkedin.com/in/${profile.linkedinSlug}`,
	`https://instagram.com/${profile.instagram}`,
];

const websiteJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: profile.name,
	url: siteUrl,
	description: siteDescription,
};

const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: profile.name,
	url: siteUrl,
	image: absoluteUrl(profileAvatarUrl),
	description: profile.bio,
	contactPoint: {
		"@type": "ContactPoint",
		email: `mailto:${profile.email}`,
		contactType: "person",
	},
	sameAs: socialUrls,
};

const personJsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: profile.name,
	url: siteUrl,
	image: absoluteUrl(profileAvatarUrl),
	jobTitle: profile.bio,
	email: `mailto:${profile.email}`,
	address: profile.location,
	sameAs: socialUrls,
};

export const meta = () =>
	seoMeta({
		title: profile.name,
		description: siteDescription,
		path: "/",
	});

const Root = () => (
	<html lang="en" suppressHydrationWarning>
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<meta
				name="theme-color"
				media="(prefers-color-scheme: light)"
				content="#fdfbf8"
			/>
			<meta
				name="theme-color"
				media="(prefers-color-scheme: dark)"
				content="#14110f"
			/>
			<link rel="preconnect" href="https://x.com" crossOrigin="anonymous" />
			<link
				rel="preconnect"
				href="https://www.linkedin.com"
				crossOrigin="anonymous"
			/>
			<link
				rel="preload"
				href="/fonts/inter/inter-latin-wght-normal.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>
			<link
				rel="preload"
				href="/fonts/space-grotesk/space-grotesk-latin-wght-normal.woff2"
				as="font"
				type="font/woff2"
				crossOrigin="anonymous"
			/>
			<JsonLd data={personJsonLd} />
			<JsonLd data={websiteJsonLd} />
			<JsonLd data={organizationJsonLd} />
			<Meta />
			<Links />
		</head>
		<body className="antialiased">
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<div aria-hidden="true" className="grain-overlay" />
				<FloatingDock />
				<Outlet />
			</ThemeProvider>
			<ScrollRestoration />
			<Scripts />
		</body>
	</html>
);

export const ErrorBoundary = () => {
	const error = useRouteError();
	const message = isRouteErrorResponse(error)
		? `${error.status} ${error.statusText}`
		: error instanceof Error
			? error.message
			: "Something went wrong";

	return (
		<div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
			<p className="mono-label text-(--accent)">Error</p>
			<h1 className="text-2xl font-semibold text-(--gb-fg0)">
				Something went wrong
			</h1>
			<p className="text-(--gb-fg2)">{message}</p>
			<a
				href="/"
				className="text-(--accent) text-sm underline underline-offset-4"
			>
				Go home
			</a>
		</div>
	);
};

export default Root;
