"use client";

import React from "react";
import {
    SiReact, SiJavascript, SiTypescript, SiNextdotjs, SiPython,
    SiCplusplus, SiGit, SiTailwindcss, SiClerk, SiDrizzle, SiTurso,
    SiFigma, SiSqlite,
} from "react-icons/si";
import { FaDatabase, FaCode, FaRobot } from "react-icons/fa";

const skills = [
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Python", icon: SiPython },
    { name: "C++", icon: SiCplusplus },
    { name: "SQL", icon: SiSqlite },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Convex", icon: FaDatabase },
    { name: "Turso", icon: SiTurso },
    { name: "Drizzle ORM", icon: SiDrizzle },
    { name: "Clerk", icon: SiClerk },
    { name: "Vercel AI SDK", icon: FaCode },
    { name: "RAG", icon: FaRobot },
    { name: "Figma", icon: SiFigma },
    { name: "Git", icon: SiGit },
];

export default function Skills() {
    return (
        <div className="w-full mt-4 relative">
            <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-2 -mx-2 md:-mx-14"></div>
            <div className="flex flex-col items-start space-y-3">
                <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50 py-2">
                    <span className="link--elara">Skills</span>
                </h1>
            </div>
            <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-4 -mx-2 md:-mx-14"></div>

            <div className="flex flex-col items-start space-y-3">
                <p className="font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-2 py-[7px] text-sm inline-block bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border mb-6">
                    I love working with these technologies to build beautiful and functional applications.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                    {skills.map((skill) => (
                        <div
                            key={skill.name}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-default"
                        >
                            <skill.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
