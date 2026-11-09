import { Link as LinkIcon } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { useParams } from "react-router";
import ButtonLink from "@/components/ButtonLink";
import JsonLd from "@/components/JsonLd";
import NotFoundBlock from "@/components/NotFoundBlock";
import { projects, siteUrl } from "@/content";
import { seoMeta } from "@/lib/seo";

const getProject = (slug: string | undefined) =>
	projects.find((project) => project.slug === slug);

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
				title="Project not found"
				message="This project doesn't exist or may have been moved."
				href="/projects"
				linkLabel="View all projects"
			/>
		);
	}

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
		<article className="flex flex-col gap-4">
			<JsonLd data={breadcrumbJsonLd} />
			<div className="flex items-center justify-between gap-2">
				<h1 className="text-2xl font-bold text-(--gb-fg0)">{project.title}</h1>
			</div>

			<div className="overflow-hidden rounded-xl border border-(--gb-border) bg-(--gb-surface)">
				<img
					src={project.banner.src}
					alt={`${project.title} banner`}
					width={project.banner.width}
					height={project.banner.height}
					fetchPriority="high"
					className="h-auto w-full object-cover"
				/>
			</div>

			<p className="text-(--gb-fg1)">{project.description}</p>

			<div className="flex flex-wrap gap-2">
				{project.liveUrl && (
					<ButtonLink
						href={project.liveUrl}
						ariaLabel={`Open live project: ${project.title}`}
						target="_blank"
						className="text-sm"
					>
						<LinkIcon />
						Live
					</ButtonLink>
				)}

				{project.githubUrl && (
					<ButtonLink
						href={project.githubUrl}
						ariaLabel={`Open GitHub repository for ${project.title}`}
						target="_blank"
						className="text-sm"
					>
						<FiGithub />
						GitHub
					</ButtonLink>
				)}
			</div>

			{project.highlights.length > 0 && (
				<section className="flex flex-col gap-2">
					<h2 className="text-lg font-semibold text-(--gb-fg0)">Highlights</h2>
					<ul className="flex flex-col gap-1.5 text-(--gb-fg1)">
						{project.highlights.map((highlight) => (
							<li
								key={`${project.slug}-highlight-${highlight}`}
								className="flex gap-2"
							>
								<span
									aria-hidden="true"
									className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-(--gb-fg2)"
								/>
								<span>{highlight}</span>
							</li>
						))}
					</ul>
				</section>
			)}

			<section className="flex flex-col gap-2">
				<h2 className="text-lg font-semibold text-(--gb-fg0)">Tech Stack</h2>
				<ul className="flex flex-wrap gap-1.5 select-none">
					{project.techStack.map((tech) => (
						<li
							key={`${project.slug}-${tech}`}
							className="mono-label list-none rounded-md border border-(--gb-border) px-2 py-1"
						>
							{tech}
						</li>
					))}
				</ul>
			</section>
		</article>
	);
};

export default ProjectDetailPage;
