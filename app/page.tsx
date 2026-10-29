"use client";


import Container from "@/components/containers";

import Projects from "@/components/projects";
import { Github, Linkedin, CodeXml, Mail } from "lucide-react";
import Timeline from "@/components/timeline";
import GithubGraph from "@/components/githubgraph";
import Skills from "@/components/skills";
import GetInTouch from "@/components/get-in-touch";

export default function Home() {

  const socials = [
    {
      name: "GitHub",
      icon: Github,
      action: () => window.open("https://github.com/rawatpriyansh17", "_blank"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open("https://www.linkedin.com/in/priyansh-rawat-712a99284/", "_blank"),
    },
    {
      name: "LeetCode",
      icon: CodeXml,
      action: () => window.open("https://leetcode.com/u/aRVIqiOVK7/", "_blank"),
    },
    {
      name: "Email",
      icon: Mail,
      action: () => (window.location.href = "mailto:priyanshrawat888@gmail.com"),
    },
  ];

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-[200vh] px-8 pt-24 md:p-20 md:pb-10 mx-auto ">

        {/* RIGHT BORDER */}
        <div
          className="absolute right-0 top-0 h-full w-6 border-x border-x-(--pattern-fg) 
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            bg-size-[10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        {/* LEFT BORDER */}
        <div
          className="absolute left-0 top-0 h-full w-6 border-x border-x-(--pattern-fg) 
            bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
            bg-size-[10px_10px] bg-fixed opacity-80 dark:opacity-12"
        ></div>

        {/* ---------------------------------------- */}
        {/* HEADING + SOCIALS (FIXED SAME LINE) */}
        {/* ---------------------------------------- */}

        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara">Priyansh Rawat</span>
          </h1>

          <div className="flex flex-wrap gap-4 sm:justify-end">
            {socials.map((social) => (
              <div
                key={social.name}
                className="relative cursor-alias group"
                onClick={social.action}
                title={social.name}
                aria-label={social.name}
              >
                <social.icon
                  size={20}
                  className="text-neutral-900 dark:text-neutral-50 opacity-70 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* SUBTEXT */}
        {/* ---------------------------------------- */}

        <div className="text-secondary font-custom2 text-s mt-1">
          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-semibold"></span>
            <span className="text-neutral-700 dark:text-neutral-300">Full-stack developer building useful things for real people.</span>
          </p>

          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-bold"></span>
            <span className="text-neutral-700 dark:text-neutral-300">Computer Science + Physics at BITS Pilani, Goa. Class of 2028.</span>
          </p>

          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-semibold"></span>
            <span className="text-neutral-700 dark:text-neutral-300">
              From campus carpools to CMS-backed AI. I learn by shipping.
            </span>
          </p>
        </div>

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-6 -mx-2 md:-mx-14"></div>



        <Projects />

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-4 -mx-2 md:-mx-14"></div>


        <Timeline></Timeline>



        <GithubGraph></GithubGraph>

        <Skills />

        <GetInTouch />


      </Container>
    </div>
  );
}