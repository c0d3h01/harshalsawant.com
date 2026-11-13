import ExperienceList from "@/components/ExperienceList";
import PageHeader from "@/components/PageHeader";
import Toolkit from "@/components/Toolkit";
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
	<div className="container-page pb-20 sm:pb-24">
		<PageHeader
			eyebrow="Experience"
			title="A short history."
			description={description}
		/>

		<div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
			<div className="lg:col-span-7">
				<ExperienceList items={experiences} />
			</div>
			<div className="lg:col-span-5">
				<Toolkit />
			</div>
		</div>
	</div>
);

export default ExperiencePage;
