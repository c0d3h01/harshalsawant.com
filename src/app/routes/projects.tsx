import ProjectList from "@/components/ProjectList";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/content";
import { seoMeta } from "@/lib/seo";

const description =
	"Backend systems, distributed services, and tools I've built in Go. See what each project does, how I built it, and the code behind it.";

export const meta = () =>
	seoMeta({
		title: "Projects",
		description,
		path: "/projects",
	});

const ProjectsPage = () => (
	<section className="flex flex-col gap-4">
		<div className="flex items-center justify-between gap-2">
			<SectionHeading title="Projects" as="h1" />
		</div>

		<ProjectList items={projects} />
	</section>
);

export default ProjectsPage;
