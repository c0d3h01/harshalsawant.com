import ExperienceList from "@/components/ExperienceList";
import SectionHeading from "@/components/SectionHeading";
import { experiences } from "@/content";

const ExperienceSection = () => {
	return (
		<section className="section-fluid flex flex-col gap-3">
			<SectionHeading title="Experience" />
			<ExperienceList items={experiences} />
		</section>
	);
};

export default ExperienceSection;
