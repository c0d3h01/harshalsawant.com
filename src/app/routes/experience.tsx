import ExperienceList from "@/components/ExperienceList";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/content";
import { seoMeta } from "@/lib/seo";

const description =
	"My professional experience as a software engineer. See where I've worked, the systems I built, and the problems I solved.";

export const meta = () =>
	seoMeta({
		title: "Experience — Software Engineer",
		description,
		path: "/experience",
	});

const ExperiencePage = () => (
	<section className="flex flex-col gap-4">
		<div className="flex items-center justify-between gap-2">
			<SectionHeading title="Experience" as="h1" />
		</div>

		<ExperienceList items={experiences} />
	</section>
);

export default ExperiencePage;
