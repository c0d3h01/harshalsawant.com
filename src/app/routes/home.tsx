import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Hero from "@/components/Hero";
import PostsSection from "@/components/PostsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { seoMeta } from "@/lib/seo";

const description =
	"I'm Harshal Sawant, a software engineer in Mumbai. I build fast backends and distributed systems in Go. See my experience, projects, and writing.";

export const meta = () =>
	seoMeta({
		title: "Harshal Sawant | Software Engineer",
		description,
		path: "/",
		absoluteTitle: true,
	});

const HomeRoute = () => (
	<>
		<Hero />
		<ProjectsSection />
		<ExperienceSection />
		<PostsSection />
		<AboutSection />
		<ContactSection />
	</>
);

export default HomeRoute;
