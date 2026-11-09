import Collapsible from "@/components/Collapsible";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/content";

const AboutSection = () => (
	<section className="section-static flex flex-col gap-2">
		<SectionHeading title="About Me" />
		<Collapsible>
			<article
				dangerouslySetInnerHTML={{ __html: profile.aboutHtml }}
				className="section-copy space-y-3 group-data-[expanded=false]:line-clamp-5"
			/>
		</Collapsible>
	</section>
);

export default AboutSection;
