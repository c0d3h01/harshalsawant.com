import { ArrowUpRight, Download } from "lucide-react";
import { profile, resumeFilePath } from "@/content";

const AboutSection = () => (
	<section id="about" className="section">
		<div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-12">
			<div className="lg:col-span-5">
				<p className="eyebrow">04 — About</p>
				<h2 className="section-title mt-2.5">The parts most people ignore.</h2>
			</div>

			<div className="lg:col-span-7">
				<div
					className="flex flex-col gap-4 text-lg leading-relaxed text-ink-soft"
					dangerouslySetInnerHTML={{ __html: profile.aboutHtml }}
				/>

				<div className="mt-7 flex flex-wrap gap-2.5">
					<a href={`mailto:${profile.email}`} className="btn btn-secondary">
						Say hello
						<ArrowUpRight aria-hidden="true" />
					</a>
					<a
						href={resumeFilePath}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-ghost"
					>
						Résumé
						<Download aria-hidden="true" />
					</a>
				</div>
			</div>
		</div>
	</section>
);

export default AboutSection;
