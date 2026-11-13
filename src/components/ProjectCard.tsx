import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router";
import ProjectCover from "@/components/ProjectCover";
import type { ProjectStatus } from "@/content";

interface ProjectCardProps {
	slug: string;
	index: number;
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
	building: { label: "Building", dotClassName: "bg-accent" },
	archived: { label: "Archived", dotClassName: "bg-muted" },
};

const ProjectCard = ({
	slug,
	index,
	title,
	status,
	description,
	skills,
	liveUrl,
	githubUrl,
}: ProjectCardProps) => {
	const statusInfo = statusMeta[status];

	return (
		<article className="work-card">
			<div className="p-2 pb-0">
				<ProjectCover slug={slug} index={index} />
			</div>

			<div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0">
						<span className="status-tag">
							<span
								aria-hidden="true"
								className={`status-tag-dot ${statusInfo.dotClassName}`}
							/>
							{statusInfo.label}
						</span>
						<h3 className="work-card-title mt-2">
							<Link
								to={`/projects/${slug}`}
								aria-label={`Open project details for ${title}`}
								className="focus-visible:outline-none"
							>
								{title}
							</Link>
						</h3>
					</div>

					<div className="work-card-actions flex shrink-0 gap-1.5">
						{liveUrl && (
							<a
								href={liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open live project: ${title}`}
								className="work-card-action"
							>
								<ExternalLink aria-hidden="true" />
							</a>
						)}

						{githubUrl && (
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`Open GitHub repository for ${title}`}
								className="work-card-action"
							>
								<FaGithub aria-hidden="true" />
							</a>
						)}
					</div>
				</div>

				<p className="text-sm leading-relaxed text-muted">{description}</p>

				<ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
					{skills.map((skill) => (
						<li
							key={skill}
							className="mono-label rounded border border-line px-2 py-1 text-[0.58rem]"
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
