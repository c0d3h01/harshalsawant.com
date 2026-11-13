import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router";
import ImagePreview from "@/components/ImagePreview";
import SocialLinks from "@/components/SocialLinks";
import { profile, profileAvatarUrl, resumeFilePath } from "@/content";

const nowRows = [
	{
		label: "Now",
		value: "Building TermChat — real-time chat in the terminal.",
	},
	{
		label: "Focus",
		value: "Go, Rust, distributed systems, and Linux internals.",
	},
	{
		label: "Based",
		value: "Mumbai, India · UTC+5:30.",
	},
];

const Hero = () => {
	const alt = `${profile.name} — ${profile.bio}`;

	return (
		<section className="hero">
			<div aria-hidden="true" className="hero-glow" />

			<div className="container-page relative">
				<div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
					<div className="lg:col-span-7">
						<p className="eyebrow rise rise-1 flex items-center gap-2.5">
							<span
								aria-hidden="true"
								className="size-1.5 rounded-full bg-emerald-500"
							/>
							Software engineer · {profile.location}
						</p>

						<h1 className="hero-title rise rise-2 mt-5">
							I build backends that{" "}
							<span className="text-accent">hold up under load.</span>
						</h1>

						<p className="hero-copy rise rise-3 mt-6">
							I'm Harshal. I design and build fast backend services, distributed
							systems, and developer tools — mostly in Go and Rust, and always
							close to the Linux parts underneath.
						</p>

						<div className="rise rise-4 mt-8 flex flex-wrap items-center gap-2.5">
							<Link to="/projects" className="btn btn-primary">
								Selected work
								<ArrowRight aria-hidden="true" />
							</Link>
							<Link to="/posts" className="btn btn-secondary">
								Read the writing
							</Link>
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

						<div className="rise rise-5 mt-10">
							<SocialLinks />
						</div>
					</div>

					<div className="rise rise-3 lg:col-span-5">
						<div className="profile-panel mx-auto max-w-md lg:max-w-none">
							<div className="flex items-center gap-4">
								<ImagePreview
									src={profileAvatarUrl}
									alt={alt}
									previewAlt={`${alt} preview`}
									dialogLabel="Profile picture preview"
									triggerAriaLabel="Open avatar preview"
									trigger={
										<img
											src={profileAvatarUrl}
											alt={alt}
											width={160}
											height={160}
											fetchPriority="high"
											className="size-16 rounded-2xl border border-line object-cover"
										/>
									}
								/>

								<div className="min-w-0">
									<p className="font-display text-lg font-semibold tracking-tight text-ink">
										{profile.name}
									</p>
									<p className="text-sm text-muted">Backend engineer</p>
									<p className="mono-label mt-1.5 flex items-center gap-2">
										<span
											aria-hidden="true"
											className="size-1.5 rounded-full bg-emerald-500"
										/>
										Building TermChat
									</p>
								</div>
							</div>

							<dl className="mt-5 border-t border-line pt-4">
								{nowRows.map(({ label, value }) => (
									<div key={label} className="now-row first:pt-0 last:pb-0">
										<dt className="eyebrow pt-0.5">{label}</dt>
										<dd className="text-sm leading-relaxed text-ink-soft">
											{value}
										</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
