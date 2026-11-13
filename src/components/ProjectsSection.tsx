import ProjectList from "@/components/ProjectList";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/content";

const ProjectsSection = () => (
	<section id="work" className="section">
		<div className="container-page">
			<SectionHeader
				index="01 — Selected work"
				title="Systems I've shipped."
				description="Backend services, developer tools, and low-level experiments — each one built to solve a problem I ran into myself."
				action={{ href: "/projects", label: "All projects" }}
			/>
			<ProjectList items={projects} limit={2} />
		</div>
	</section>
);

export default ProjectsSection;
