const toolkit = [
	{
		label: "Languages",
		items: ["Go", "Rust", "C++", "TypeScript", "Shell"],
	},
	{
		label: "Systems",
		items: ["PostgreSQL", "Redis", "Docker", "Linux", "Tokio", "Actix Web"],
	},
	{
		label: "Frontend",
		items: ["React", "Next.js", "Tailwind CSS"],
	},
];

const Toolkit = () => (
	<div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
		<p className="eyebrow">Toolkit</p>

		<div className="mt-5">
			{toolkit.map(({ label, items }) => (
				<div
					key={label}
					className="toolkit-group first:mt-0 first:pt-0 first:border-t-0"
				>
					<p className="text-sm font-semibold text-ink">{label}</p>
					<ul className="mt-2 flex flex-wrap gap-1.5">
						{items.map((item) => (
							<li
								key={item}
								className="mono-label rounded border border-line px-2 py-1 text-[0.58rem]"
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	</div>
);

export default Toolkit;
