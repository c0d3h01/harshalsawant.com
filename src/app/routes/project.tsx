import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import JsonLd from "@/components/JsonLd";
import NotFoundBlock from "@/components/NotFoundBlock";
import ProjectCover from "@/components/ProjectCover";
import { projects, siteUrl } from "@/content";
import { seoMeta } from "@/lib/seo";

const getProject = (slug: string | undefined) =>
	projects.find((project) => project.slug === slug);

const statusLabels = {
	active: "Active",
	building: "Building",
	archived: "Archived",
} as const;

export const meta = ({ params }: { params: { slug?: string } }) => {
	const project = getProject(params.slug);

	if (!project) {
		return seoMeta({
			title: "Project Not Found",
			description: "This project doesn't exist or may have been moved.",
			path: `/projects/${params.slug ?? ""}`,
			noindex: true,
		});
	}

	return seoMeta({
		title: project.title,
		description: project.description,
		path: `/projects/${project.slug}`,
		type: "article",
	});
};

const ProjectDetailPage = () => {
	const { slug } = useParams();
	const project = getProject(slug);

	if (!project) {
		return (
			<NotFoundBlock
				title="Project not found."
				message="This project doesn't exist or may have been moved."
				href="/projects"
				linkLabel="View all projects"
			/>
		);
	}

	const index = projects.findIndex((item) => item.slug === project.slug);
	const nextProject = projects[(index + 1) % projects.length];
	const projectUrl = `${siteUrl}/projects/${project.slug}`;

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
			{
				"@type": "ListItem",
				position: 2,
				name: "Projects",
				item: `${siteUrl}/projects`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: project.title,
				item: projectUrl,
			},
		],
	};

	return (
		<div className="container-page pb-20 pt-8 sm:pb-24 sm:pt-10">
			<JsonLd data={breadcrumbJsonLd} />

			<Link to="/projects" className="section-link">
				<ArrowLeft aria-hidden="true" />
				All projects
			</Link>

			<header className="mt-7 max-w-4xl">
				<div className="flex flex-wrap items-center gap-3">
					<p className="eyebrow">
						Project {String(index + 1).padStart(2, "0")}
					</p>
					<span className="status-tag">{statusLabels[project.status]}</span>
				</div>

				<h1 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink">
					{project.title}
				</h1>

				<p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
					{project.description}
				</p>

				<div className="mt-6 flex flex-wrap gap-2.5">
					{project.githubUrl && (
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-secondary"
						>
							<FaGithub aria-hidden="true" />
							View source
							<ArrowUpRight aria-hidden="true" />
						</a>
					)}

					{project.liveUrl && (
						<a
							href={project.liveUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-primary"
						>
							<ExternalLink aria-hidden="true" />
							Live project
						</a>
					)}
				</div>
			</header>

			<div className="mt-10">
				<ProjectCover slug={project.slug} index={index + 1} wide />
			</div>

			<div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
				<section className="lg:col-span-8">
					<h2 className="section-title text-[1.6rem]">What it does</h2>

					<ol className="mt-5 flex flex-col gap-5">
						{project.highlights.map((highlight, highlightIndex) => (
							<li
								key={`${project.slug}-highlight-${highlight}`}
								className="grid grid-cols-[2rem_1fr] gap-3"
							>
								<span className="mono-label pt-1">
									{String(highlightIndex + 1).padStart(2, "0")}
								</span>
								<p className="leading-relaxed text-ink-soft">{highlight}</p>
							</li>
						))}
					</ol>
				</section>

				<aside className="lg:col-span-4">
					<div className="rounded-2xl border border-line bg-surface p-5">
						<p className="eyebrow">Tech stack</p>
						<ul className="mt-3 flex flex-wrap gap-1.5">
							{project.techStack.map((tech) => (
								<li
									key={`${project.slug}-${tech}`}
									className="mono-label rounded border border-line px-2 py-1 text-[0.58rem]"
								>
									{tech}
								</li>
							))}
						</ul>

						<div className="mt-5 border-t border-line pt-4">
							<p className="text-sm text-muted">
								Code and history live on GitHub.
							</p>
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="section-link mt-2"
							>
								Open repository
								<ArrowUpRight aria-hidden="true" />
							</a>
						</div>
					</div>
				</aside>
			</div>

			{nextProject && (
				<Link
					to={`/projects/${nextProject.slug}`}
					className="mt-14 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent sm:p-6"
				>
					<div>
						<p className="eyebrow">Next project</p>
						<p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-ink">
							{nextProject.title}
						</p>
					</div>
					<ArrowUpRight
						aria-hidden="true"
						className="size-5 shrink-0 text-muted"
					/>
				</Link>
			)}
		</div>
	);
};

export default ProjectDetailPage;
