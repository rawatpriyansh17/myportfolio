import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/command-menu";
import { CurrentTime } from "@/components/CurrentTime";
import { FooterBackground } from "@/components/FooterBackground";

const vertical = { maskImage: "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)" };
const horizontal = { maskImage: "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)" };

export function PageFrame({ title, subtitle, back = "/", children }: {
  title: string; subtitle?: string; back?: string; children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black relative overflow-x-hidden transition-colors duration-300">
      <div className="absolute top-0 bottom-0 left-[15%] xl:left-[30%] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden md:block" style={vertical} />
      <div className="absolute top-0 bottom-0 right-[15%] xl:right-[30%] w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none hidden md:block" style={vertical} />
      <div className="absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={horizontal} />
      <div className="absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none" style={horizontal} />
      <div className="absolute left-0 right-0 md:left-[15%] xl:left-[30%] md:right-[15%] xl:right-[30%] top-0 h-[22vh] pointer-events-none">
        <FooterBackground />
        <div className="absolute bottom-3 right-2 z-10"><CurrentTime /></div>
      </div>
      <div className="absolute left-0 right-0 md:left-[15%] xl:left-[30%] md:right-[15%] xl:right-[30%] top-[22vh] h-[112px] flex items-center px-4 z-20">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-5 min-w-0">
            <Link href={back} aria-label="Go back" className="group flex shrink-0 items-center justify-center w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800"><ArrowLeft className="w-4 h-4" /></Link>
            <div className="min-w-0">
              <p className="text-[20px] sm:text-[24px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight leading-none mb-0.5">{title}</p>
              {subtitle && <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-1">{subtitle}</p>}
            </div>
          </div>
          <div className="flex shrink-0 items-start gap-2"><CommandMenu /><ThemeToggle /></div>
        </div>
      </div>
      <main className="ml-0 mr-0 md:ml-[15%] xl:ml-[30%] md:mr-[15%] xl:mr-[30%] pt-[calc(22vh+112px)] pb-16 px-4 relative">
        {children}
      </main>
    </div>
  );
}
