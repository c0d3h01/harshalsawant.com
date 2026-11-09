import {
	ArrowLeft,
	FolderGit2,
	History,
	LayoutDashboard,
	Moon,
	NotebookPen,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import type { IconComponent } from "@/content";

interface DockRoute {
	href: string;
	label: string;
	icon: IconComponent;
	exact?: boolean;
}

const HOME = "/";

const dockRoutes: DockRoute[] = [
	{ href: HOME, label: "Home", icon: LayoutDashboard, exact: true },
	{ href: "/experience", label: "Experience", icon: History },
	{ href: "/projects", label: "Projects", icon: FolderGit2 },
	{ href: "/posts", label: "Posts", icon: NotebookPen },
];

const getParentPath = (pathname: string) => {
	const segments = pathname.split("/").filter(Boolean);
	return segments.length > 1 ? `/${segments.slice(0, -1).join("/")}` : HOME;
};

const FloatingDock = () => {
	const { pathname } = useLocation();
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const showBack = pathname !== HOME;

	return (
		<div className="dock-wrapper">
			<nav aria-label="Primary" className="dock">
				{showBack && (
					<>
						<Link
							to={getParentPath(pathname)}
							aria-label="Back"
							className="dock-item"
						>
							<ArrowLeft aria-hidden="true" />
							<span className="dock-tooltip">Back</span>
						</Link>
						<div className="dock-divider" aria-hidden="true" />
					</>
				)}

				{dockRoutes.map(({ href, label, icon: Icon, exact }) => {
					const active = exact ? pathname === href : pathname.startsWith(href);
					return (
						<Link
							key={href}
							to={href}
							aria-label={label}
							aria-current={active ? "page" : undefined}
							className="dock-item"
							data-active={active ? "true" : "false"}
						>
							<Icon aria-hidden="true" />
							<span className="dock-tooltip">{label}</span>
						</Link>
					);
				})}

				<div className="dock-divider" aria-hidden="true" />

				<button
					type="button"
					className="dock-item"
					aria-label="Toggle color theme"
					onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
				>
					{mounted && resolvedTheme === "dark" ? (
						<Sun aria-hidden="true" />
					) : (
						<Moon aria-hidden="true" />
					)}
					<span className="dock-tooltip">Theme</span>
				</button>
			</nav>
		</div>
	);
};

export default FloatingDock;
