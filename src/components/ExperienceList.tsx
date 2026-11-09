import type { Experience } from "@/content";

interface ExperienceListProps {
	items: Experience[];
}

const ExperienceList = ({ items }: ExperienceListProps) => (
	<div className="section-copy flex flex-col gap-3">
		{items.map(
			({ role, company, duration, location, isCurrent, highlights }) => (
				<article
					key={`${role}·${company}`}
					className="experience-card relative rounded-xl border border-(--gb-border) bg-(--gb-surface) p-4 pl-5 before:absolute before:inset-y-4 before:left-0 before:w-0.75 before:rounded-full before:bg-(--accent) before:opacity-80 hover:ring-1 hover:ring-(--accent)"
				>
					<div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
						<h3 className="min-w-0 text-[1.02rem] font-semibold text-(--gb-fg0)">
							{role} · {company}
						</h3>
						<p className="mono-label tnum whitespace-nowrap">
							{duration}
							{isCurrent && <span className="text-(--accent)"> · active</span>}
						</p>
					</div>
					<p className="text-sm text-(--gb-fg2)">{location}</p>
					<ul className="mt-2.5 flex flex-col gap-1.5 text-[0.95rem] text-(--gb-fg1)">
						{highlights.map((highlight) => (
							<li
								key={highlight}
								className="flex gap-2 before:mt-2.5 before:size-1 before:shrink-0 before:rounded-full before:bg-(--gb-fg2)"
							>
								{highlight}
							</li>
						))}
					</ul>
				</article>
			),
		)}
	</div>
);

export default ExperienceList;
