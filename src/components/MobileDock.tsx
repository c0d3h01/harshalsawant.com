import { FolderGit2, History, House, NotebookPen } from "lucide-react";
import { Link, useLocation } from "react-router";
import type { IconComponent } from "@/content";

interface DockRoute {
	href: string;
	label: string;
	icon: IconComponent;
	exact?: boolean;
}

const dockRoutes: DockRoute[] = [
	{ href: "/", label: "Home", icon: House, exact: true },
	{ href: "/projects", label: "Work", icon: FolderGit2 },
	{ href: "/posts", label: "Writing", icon: NotebookPen },
	{ href: "/experience", label: "Experience", icon: History },
];

const MobileDock = () => {
	const { pathname } = useLocation();

	return (
		<nav aria-label="Primary" className="dock-wrapper md:hidden">
			<div className="dock">
				{dockRoutes.map(({ href, label, icon: Icon, exact }) => {
					const active = exact ? pathname === href : pathname.startsWith(href);

					return (
						<Link
							key={href}
							to={href}
							className="dock-item"
							data-active={active ? "true" : "false"}
							aria-current={active ? "page" : undefined}
						>
							<Icon aria-hidden="true" />
							{label}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default MobileDock;
