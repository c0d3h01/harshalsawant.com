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
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, viewport-fit=cover"
			/>
			<meta name="color-scheme" content="light dark" />
			<link rel="icon" href="/favicon.ico" sizes="any" />
			<meta
				name="theme-color"
				media="(prefers-color-scheme: light)"
				content="#f7f3ec"
			/>
			<meta
				name="theme-color"
				media="(prefers-color-scheme: dark)"
				content="#12100e"
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
			<link
				rel="preload"
				href={profileAvatarUrl}
				as="image"
				fetchPriority="high"
			/>
			<JsonLd data={personJsonLd} />
			<JsonLd data={websiteJsonLd} />
			<JsonLd data={organizationJsonLd} />
			<Meta />
			<Links />
		</head>
		<body>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<div aria-hidden="true" className="grain-overlay" />
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
			<p className="eyebrow text-accent">Error</p>
			<h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
				Something went wrong
			</h1>
			<p className="max-w-md text-muted">{message}</p>
			<a href="/" className="btn btn-primary mt-2">
				Go home
			</a>
		</div>
	);
};

export default Root;
