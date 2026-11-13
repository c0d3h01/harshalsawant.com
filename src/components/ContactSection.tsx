import { ArrowUpRight } from "lucide-react";
import SocialLinks from "@/components/SocialLinks";
import { profile } from "@/content";

const ContactSection = () => (
	<section id="contact" className="section">
		<div className="container-page">
			<div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-14">
				<div aria-hidden="true" className="hero-glow opacity-80" />

				<div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
					<div className="lg:col-span-7">
						<p className="eyebrow">05 — Contact</p>
						<h2 className="section-title mt-2.5 text-[clamp(2rem,4vw,3.2rem)]">
							Let's talk systems.
						</h2>
						<p className="mt-4 max-w-xl text-muted">
							Have a backend problem, an interesting system, or a project worth
							building? My inbox is open.
						</p>
					</div>

					<div className="lg:col-span-5">
						<a href={`mailto:${profile.email}`} className="group block">
							<span className="mono-label">Email</span>
							<span className="mt-1.5 flex items-center gap-2 break-words font-display text-base font-semibold tracking-tight text-ink sm:text-xl">
								{profile.email}
								<ArrowUpRight
									aria-hidden="true"
									className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
								/>
							</span>
						</a>

						<div className="mt-5">
							<SocialLinks />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default ContactSection;
