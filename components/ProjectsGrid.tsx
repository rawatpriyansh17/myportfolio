"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  type TechIcon,
  type TechKey,
  type TechItem,
  type Project,
  iconMap,
  techNames,
  projectsData,
} from "@/data/projectsData";

export {
  type TechIcon,
  type TechKey,
  type TechItem,
  type Project,
  iconMap,
  techNames,
  projectsData,
};

export const ProjectCard = ({
  project,
  isPriority = false,
}: {
  project: Project;
  isPriority?: boolean;
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const router = useRouter();

  const statusColor = project.category ? "bg-violet-400" : "bg-emerald-500";
  const statusLabel = project.category ?? "Live";

  return (
    <div
      className="flex flex-col group cursor-pointer"
      onClick={() => router.push(`/projects/${project.slug}`)}
      role="link"
      tabIndex={0}
      aria-label={`Read about ${project.title}`}
      onKeyDown={(event) => { if (event.key === "Enter" && event.target === event.currentTarget) router.push(`/projects/${project.slug}`); }}
    >
      {/* Project cover */}
      <motion.div
        className="relative w-full aspect-video rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50/80 dark:bg-[#09090b]/80 shadow-sm p-1 overflow-hidden transition-[border-color,box-shadow] duration-200 hover:shadow-md hover:border-black/10 dark:hover:border-white/10"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Ambient Hover Background */}
        {project.backgroundImage && (
          <div className="absolute inset-0 scale-100 opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:scale-[1.03] group-hover:opacity-100">
            <Image
              src={project.backgroundImage}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 768px) 320px, calc(100vw - 2rem)"
              quality={70}
              className="object-cover"
            />
          </div>
        )}

        {/* Uniform inset keeps the whole cover visible without letterboxing */}
        <motion.div
          className="relative z-20 size-full rounded-lg overflow-hidden border border-black/5 bg-white dark:border-white/[0.15] dark:bg-[#0a0a0a]"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 0.90 },
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="size-full overflow-hidden rounded-[7px]">
            <Image
              src={project.src}
              alt={`${project.title} preview`}
              width={600}
              height={400}
              preload={isPriority}
              sizes="(min-width: 768px) 17vw, calc(100vw - 2rem)"
              quality={70}
              loading={project.lightModeSrc ? "eager" : undefined}
              className={`size-full object-cover ${project.lightModeSrc ? "hidden dark:block" : ""}`}
            />
            {project.lightModeSrc && <Image
              src={project.lightModeSrc}
              alt={`${project.title} preview`}
              width={600}
              height={400}
              loading="eager"
              sizes="(min-width: 1280px) 17vw, (min-width: 768px) 70vw, calc(100vw - 2rem)"
              className="size-full object-cover dark:hidden"
            />}
          </div>
        </motion.div>
      </motion.div>

      {/* Content Area directly below the wrapper */}
      <div className="mt-4 flex flex-col px-0.5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{project.title}</h3>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 w-fit shrink-0">
            <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">{statusLabel}</span>
          </div>
        </div>

        <p className="mt-2 sm:mt-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed pr-2">
          {project.description}
        </p>

        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex gap-2 flex-wrap">
            {project.tech.map((item) => {
              const key = typeof item === "string" ? item : item.label;
              const isIconItem = typeof item === "string";
              const tooltipText = isIconItem ? techNames[item] : item.tooltip || item.label;
              const uniqueId = `${project.title}-${key}`;

              return (
                <div
                  key={key}
                  className="relative"
                  title={tooltipText}
                  aria-label={tooltipText}
                  onMouseEnter={() => setHoveredTech(uniqueId)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {isIconItem ? (
                    (() => {
                      const TechIcon = iconMap[item];
                      return <TechIcon className="w-4 h-4 md:w-3.5 md:h-3.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors" />;
                    })()
                  ) : (
                    <span className="px-1.5 py-0.5 rounded border border-black/30 dark:border-white/[0.15] text-[9px] text-zinc-500 dark:text-zinc-400 leading-none">
                      {item.label}
                    </span>
                  )}
                  <AnimatePresence>
                    {hoveredTech === uniqueId && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                      >
                        <div className="bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                          {tooltipText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <a href={project.live || project.github} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1 text-[11px] font-medium text-zinc-500 transition-colors cursor-pointer group-hover:text-zinc-800 dark:group-hover:text-zinc-200 sm:text-[12px]" onClick={(event) => event.stopPropagation()}>
            View Project<ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export function ProjectsGrid() {
  return (
    <>
      <div className="flex flex-col relative z-10 w-full">
        {/* Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-10 xl:gap-y-0 pb-10 xl:pb-6">
          {projectsData.slice(0, 2).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Middle Horizontal Line Container */}
        <div className="relative w-full h-0 hidden xl:block">
          <div className="absolute left-[-100vw] right-[-100vw] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={{ maskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)', WebkitMaskImage: 'repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)' }} />
          {/* Intersections */}
          <div className="absolute top-0 -left-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 -right-4 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
          <div className="absolute top-0 left-1/2 w-[2px] h-[2px] bg-black/40 dark:bg-white/[0.25] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20" />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-10 xl:gap-y-0 pt-0 xl:pt-6">
          {projectsData.slice(2, 4).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

    </>
  );
}
