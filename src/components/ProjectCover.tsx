interface ProjectCoverProps {
	slug: string;
	index: number;
	wide?: boolean;
}

const coverMeta: Record<
	string,
	{ label: string; variant: "stream" | "terminal" | "sliders" | "cores" }
> = {
	harustream: { label: "Streaming aggregator", variant: "stream" },
	termchat: { label: "Terminal chat", variant: "terminal" },
	androidtweaker: { label: "Android tuning", variant: "sliders" },
	coretaskoptimizer: { label: "Kernel scheduling", variant: "cores" },
};

const StreamCover = () => (
	<>
		<div className="cover-glow" />
		<svg
			aria-hidden="true"
			className="absolute inset-0 h-full w-full"
			viewBox="0 0 320 200"
			fill="none"
		>
			<g stroke="var(--cover-line)">
				<line x1="160" y1="100" x2="52" y2="44" />
				<line x1="160" y1="100" x2="268" y2="44" />
				<line x1="160" y1="100" x2="52" y2="156" />
				<line x1="160" y1="100" x2="268" y2="156" />
				<line x1="160" y1="100" x2="160" y2="26" />
				<line x1="160" y1="100" x2="160" y2="174" />
			</g>
			<circle
				cx="160"
				cy="100"
				r="68"
				stroke="var(--cover-line)"
				strokeDasharray="2 6"
			/>
			<circle cx="160" cy="100" r="45" stroke="var(--cover-line)" />
			<circle cx="160" cy="100" r="21" fill="var(--cover-accent)" />
			<path d="M155 92.5 170 100 155 107.5Z" fill="var(--cover-bg)" />
			<g fill="var(--cover-muted)">
				<circle cx="52" cy="44" r="3" />
				<circle cx="268" cy="44" r="3" />
				<circle cx="52" cy="156" r="3" />
				<circle cx="268" cy="156" r="3" />
				<circle cx="160" cy="26" r="3" />
				<circle cx="160" cy="174" r="3" />
			</g>
			<circle cx="228" cy="100" r="3.5" fill="var(--cover-accent)" />
			<circle cx="92" cy="100" r="3.5" fill="var(--cover-accent)" />
		</svg>
		<span className="absolute bottom-4 left-5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[var(--cover-muted)]">
			15+ providers · one stream
		</span>
	</>
);

const TerminalCover = () => (
	<>
		<div className="cover-glow" />
		<div className="cover-terminal">
			<div className="cover-terminal-bar">
				<span className="cover-terminal-dot" />
				<span className="cover-terminal-dot" />
				<span className="cover-terminal-dot" />
				<span className="ml-auto font-mono text-[0.5rem] uppercase tracking-[0.1em] text-[var(--cover-muted)]">
					termchat
				</span>
			</div>
			<div className="cover-terminal-body">
				<p className="cover-terminal-line">
					<span className="text-[var(--cover-accent)]">alice</span> anyone up?
				</p>
				<p className="cover-terminal-line">
					<strong>bob</strong> shipping termchat
				</p>
				<p className="cover-terminal-line">
					<strong>you</strong> connected · 4 peers
				</p>
				<p className="cover-terminal-line mt-1">
					<span className="text-[var(--cover-accent)]">&gt;</span>
					<span className="cover-terminal-cursor" />
				</p>
			</div>
		</div>
	</>
);

const sliders = [
	{ label: "CPU", value: 82 },
	{ label: "MEM", value: 64 },
	{ label: "BG", value: 38 },
];

const SlidersCover = () => (
	<>
		<div className="cover-glow" />
		<div className="cover-sliders">
			{sliders.map(({ label, value }) => (
				<div key={label} className="cover-slider">
					<span>{label}</span>
					<span className="cover-slider-track">
						<span
							className="cover-slider-fill"
							style={{ width: `${value}%` }}
						/>
					</span>
					<span className="cover-slider-value">{value}</span>
				</div>
			))}
			<div className="mt-1 flex items-center justify-between border-t border-[var(--cover-line)] pt-3 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-[var(--cover-muted)]">
				<span>profile: balanced</span>
				<span className="text-[var(--cover-accent)]">active</span>
			</div>
		</div>
	</>
);

const cores = ["P0", "P1", "P2", "P3", "E0", "E1", "E2", "E3"];

const CoresCover = () => (
	<>
		<div className="cover-glow" />
		<div className="cover-core-label">
			<div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.12em] text-[var(--cover-muted)]">
				<span>P-cores</span>
				<span>E-cores</span>
			</div>
			<div className="mt-2 grid grid-cols-4 gap-1.5">
				{cores.map((core, index) => (
					<span
						key={core}
						className={`grid aspect-square place-items-center rounded-[4px] border border-[var(--cover-line)] font-mono text-[0.5rem] ${
							[0, 1, 4].includes(index)
								? "bg-[var(--cover-accent)] text-[var(--cover-bg)]"
								: "text-[var(--cover-muted)]"
						}`}
					>
						{core}
					</span>
				))}
			</div>
			<div className="mt-3 flex items-center gap-2 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-[var(--cover-muted)]">
				<span className="h-px flex-1 bg-[var(--cover-line)]" />
				sched_setaffinity
				<span className="h-px flex-1 bg-[var(--cover-line)]" />
			</div>
		</div>
	</>
);

const coverVariants = {
	stream: StreamCover,
	terminal: TerminalCover,
	sliders: SlidersCover,
	cores: CoresCover,
};

const ProjectCover = ({ slug, index, wide = false }: ProjectCoverProps) => {
	const meta = coverMeta[slug] ?? coverMeta.harustream;
	const Art = coverVariants[meta.variant];

	return (
		<div
			aria-hidden="true"
			className={`project-cover ${wide ? "project-cover-wide" : ""}`}
		>
			<div className="cover-art">
				<Art />
			</div>
			<div className="cover-meta">
				<span>{meta.label}</span>
				<span className="tnum">{String(index).padStart(2, "0")}</span>
			</div>
		</div>
	);
};

export default ProjectCover;
