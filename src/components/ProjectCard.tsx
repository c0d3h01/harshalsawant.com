import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router";
import type { ProjectStatus } from "@/content";

interface ProjectCardProps {
	slug: string;
	title: string;
	status: ProjectStatus;
	description: string;
	skills: string[];
	liveUrl?: string;
	githubUrl?: string;
}

const statusMeta: Record<
	ProjectStatus,
	{ label: string; dotClassName: string }
> = {
	active: { label: "Active", dotClassName: "bg-emerald-500" },
	building: { label: "Building", dotClassName: "bg-(--accent)" },
	archived: { label: "Archived", dotClassName: "bg-(--gb-fg2)" },
};

const ProjectCard = ({
	slug,
	title,
	status,
	description,
	skills,
	liveUrl,
	githubUrl,
}: ProjectCardProps) => {
	const statusInfo = statusMeta[status];

	return (
		<article className="project-card relative rounded-xl">
			<Link
				to={`/projects/${slug}`}
				aria-label={`Open project details for ${title}`}
				className="absolute inset-0 z-20 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
			/>

			<div className="flex flex-col gap-1.5 p-3.5">
				<div className="flex items-center justify-between">
					<div className="flex min-w-0 items-center gap-2.5">
						<h2 className="truncate text-lg font-semibold text-(--gb-fg0) sm:text-xl md:text-2xl">
							{title}
						</h2>
						<span className="status-tag">
							<span
								aria-hidden="true"
								className={`status-tag-dot ${statusInfo.dotClassName}`}
							/>
							{statusInfo.label}
						</span>
					</div>

					<div className="relative z-30 flex select-none gap-1 px-1 text-base sm:gap-2 sm:px-2">
						{liveUrl && (
							<a
								href={liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open live project: ${title}`}
								className="project-card-action"
							>
								<ExternalLink />
							</a>
						)}

						{githubUrl && (
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open GitHub repository for ${title}`}
								className="project-card-action"
							>
								<FaGithub />
							</a>
						)}
					</div>
				</div>

				<p className="text-(--gb-fg1)">{description}</p>
			</div>

			<div className="mt-1 border-t border-(--gb-border) px-3.5 py-2.5">
				<ul className="flex select-none flex-wrap gap-1.5">
					{skills.map((skill) => (
						<li
							key={skill}
							className="mono-label rounded-md border border-(--gb-border) px-2 py-1"
						>
							{skill}
						</li>
					))}
				</ul>
			</div>
		</article>
	);
};

export default ProjectCard;
