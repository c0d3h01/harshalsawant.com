import ExperienceList from "@/components/ExperienceList";
import SectionHeader from "@/components/SectionHeader";
import Toolkit from "@/components/Toolkit";
import { experiences } from "@/content";

const ExperienceSection = () => (
	<section id="experience" className="section">
		<div className="container-page">
			<SectionHeader
				index="02 — Experience"
				title="Where I've worked."
				action={{ href: "/experience", label: "Full experience" }}
			/>

			<div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
				<div className="lg:col-span-7">
					<ExperienceList items={experiences} />
				</div>
				<div className="lg:col-span-5">
					<Toolkit />
				</div>
			</div>
		</div>
	</section>
);

export default ExperienceSection;
