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
		<div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
			{visibleItems.map((project, index) => (
				<ProjectCard
					key={project.slug}
					slug={project.slug}
					index={index + 1}
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
