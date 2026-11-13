import type { Experience } from "@/content";

interface ExperienceListProps {
	items: Experience[];
}

const ExperienceList = ({ items }: ExperienceListProps) => (
	<div className="flex flex-col gap-9">
		{items.map(
			({ role, company, duration, location, isCurrent, highlights }) => (
				<article key={`${role}·${company}`} className="timeline">
					<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
						<h3 className="text-lg font-semibold tracking-tight text-ink">
							{role} · {company}
						</h3>
						{isCurrent && (
							<span className="status-tag">
								<span
									aria-hidden="true"
									className="status-tag-dot bg-emerald-500"
								/>
								Current
							</span>
						)}
					</div>

					<p className="mt-1.5 text-sm text-muted">
						{location} · <span className="mono-label tnum">{duration}</span>
					</p>

					<ul className="mt-4 flex flex-col gap-2 text-[0.95rem] leading-relaxed text-ink-soft">
						{highlights.map((highlight) => (
							<li key={highlight} className="flex gap-2.5">
								<span
									aria-hidden="true"
									className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
								/>
								<span>{highlight}</span>
							</li>
						))}
					</ul>
				</article>
			),
		)}
	</div>
);

export default ExperienceList;
