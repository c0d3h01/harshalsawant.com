import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/content";

interface ProjectListProps {
	items: Project[];
	limit?: number;
}

const ProjectList = ({ items, limit }: ProjectListProps) => {
	const visibleItems =
		typeof limit === "number" ? items.slice(0, limit) : items;

	return (
		<div className="flex flex-col gap-2.5 md:gap-3.5">
			{visibleItems.map((project) => (
				<ProjectCard
					key={project.slug}
					slug={project.slug}
					title={project.title}
					status={project.status}
					description={project.description}
					skills={project.techStack}
					liveUrl={project.liveUrl}
					githubUrl={project.githubUrl}
				/>
			))}
		</div>
	);
};

export default ProjectList;
