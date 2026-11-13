import PageHeader from "@/components/PageHeader";
import ProjectList from "@/components/ProjectList";
import { projects } from "@/content";
import { seoMeta } from "@/lib/seo";

const description =
	"Backend systems, distributed services, and tools I've built in Go, Rust, and C++. See what each project does, how I built it, and the code behind it.";

export const meta = () =>
	seoMeta({
		title: "Projects",
		description,
		path: "/projects",
	});

const ProjectsPage = () => (
	<div className="container-page pb-20 sm:pb-24">
		<PageHeader
			eyebrow="Work"
			title="Selected work."
			description={description}
		/>
		<ProjectList items={projects} />
	</div>
);

export default ProjectsPage;
