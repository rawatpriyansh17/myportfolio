import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PageFrame } from "@/components/PageFrame";
import { projectsData, techNames } from "@/data/projectsData";
export function generateStaticParams() { return projectsData.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = projectsData.find(p => p.slug === slug);
  return { title: `${item?.title ?? "Project not found"} | Priyansh Rawat`, description: item?.description };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find(p => p.slug === slug);
  if (!project) notFound();
  return <PageFrame title="Project notes" subtitle="From idea to implementation" back="/projects">
    <article className="py-8">
      <h1 className="text-3xl font-semibold tracking-tight mb-3">{project.title}</h1>
      <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 mb-6">{project.description}</p>
      <Image src={project.src} alt={project.imageTitle} width={1536} height={864} priority className="w-full aspect-video object-cover rounded-lg" />
      <div className="flex flex-wrap gap-4 my-6 text-sm">
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-4">Visit project<ArrowUpRight className="size-4" /></a>
        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-4"><SiGithub className="size-4" />Source code</a>}
      </div>
      <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{project.overview}</p>
      <h2 className="text-lg font-semibold mt-8 mb-3">What I built</h2>
      <ul className="space-y-3 pl-5 list-disc text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <h2 className="text-lg font-semibold mt-8 mb-3">Technologies</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{project.tech.map(tech => typeof tech === "string" ? techNames[tech] : tech.label).join(" · ")}</p>
      {project.article && <Link href={project.article} className="inline-flex items-center gap-2 mt-8 text-sm underline underline-offset-4">Read the engineering story<ArrowUpRight className="size-4" /></Link>}
    </article>
  </PageFrame>;
}
