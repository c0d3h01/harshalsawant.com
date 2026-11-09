import {
	type ReactNode,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

const Collapsible = ({ children }: { children: ReactNode }) => {
	const [expanded, setExpanded] = useState(true);
	const [overflowing, setOverflowing] = useState(false);
	const id = useId();
	const boxRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const box = boxRef.current;
		const content = box?.firstElementChild;
		if (!box || !content) return;

		const measure = () => {
			const prev = box.dataset.expanded;
			box.dataset.expanded = "false";
			setOverflowing(content.scrollHeight > content.clientHeight + 1);
			if (prev) box.dataset.expanded = prev;
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(box);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="flex flex-col gap-2">
			<div
				ref={boxRef}
				id={id}
				data-expanded={expanded || !overflowing}
				className="group relative"
			>
				{children}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-8 bg-linear-to-t from-(--gb-surface) to-transparent group-data-[expanded=false]:block"
				/>
			</div>

			{overflowing && (
				<button
					type="button"
					onClick={() => setExpanded((v) => !v)}
					aria-expanded={expanded}
					aria-controls={id}
					className="self-start text-sm font-medium text-(--gb-fg2) underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
				>
					{expanded ? "See less" : "See more"}
				</button>
			)}
		</div>
	);
};

export default Collapsible;
