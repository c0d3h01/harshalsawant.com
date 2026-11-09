import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import PostsSection from "@/components/PostsSection";
import ProfileHeader from "@/components/ProfileHeader";
import ProjectsSection from "@/components/ProjectsSection";
import { profile, profileAvatarUrl } from "@/content";
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
	<div className="section-stack flex flex-col gap-4">
		<div className="section-profile">
			<ProfileHeader
				userName={profile.name}
				userBio={profile.bio}
				userImage={profileAvatarUrl}
			/>
		</div>
		<AboutSection />
		<ExperienceSection />
		<ProjectsSection />
		<PostsSection />
		<Footer />
	</div>
);

export default HomeRoute;
