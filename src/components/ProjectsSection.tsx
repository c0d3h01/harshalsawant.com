import ProjectList from "@/components/ProjectList";
import SectionHeading from "@/components/SectionHeading";
import ViewAllLink from "@/components/ViewAllLink";
import { projects } from "@/content";

const ProjectsSection = () => {
	return (
		<section id="projects" className="section-fluid flex flex-col gap-3">
			<SectionHeading title="Projects" />
			<ProjectList items={projects} limit={2} />
			{projects.length > 2 && (
				<ViewAllLink href="/projects" label="View all projects" />
			)}
		</section>
	);
};

export default ProjectsSection;
