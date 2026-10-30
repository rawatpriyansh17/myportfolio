import type { ComponentType } from "react";
import {
  SiNextdotjs, SiTypescript, SiReact, SiTailwindcss, SiClerk, SiTurso,
  SiDrizzle, SiRazorpay, SiVercel, SiPython, SiCplusplus, SiJavascript,
  SiGit, SiGithub, SiFigma, SiSqlite, SiFramer,
} from "react-icons/si";

export type TechIcon = ComponentType<{ className?: string }>;
export const iconMap = {
  next: SiNextdotjs, ts: SiTypescript, react: SiReact, tailwind: SiTailwindcss,
  clerk: SiClerk, turso: SiTurso, drizzle: SiDrizzle, razorpay: SiRazorpay,
  vercel: SiVercel, python: SiPython, cpp: SiCplusplus, js: SiJavascript,
  git: SiGit, github: SiGithub, figma: SiFigma, sql: SiSqlite, motion: SiFramer,
};
export type TechKey = keyof typeof iconMap;
export type TechItem = TechKey | { label: string; tooltip?: string };
export const techNames: Record<TechKey, string> = {
  next: "Next.js", ts: "TypeScript", react: "React", tailwind: "Tailwind CSS",
  clerk: "Clerk", turso: "Turso", drizzle: "Drizzle ORM", razorpay: "Razorpay",
  vercel: "Vercel AI SDK", python: "Python", cpp: "C++", js: "JavaScript",
  git: "Git", github: "GitHub", figma: "Figma", sql: "SQL", motion: "Motion",
};
export const skills = (["react", "next", "ts", "js", "python", "cpp", "sql", "tailwind", "clerk", "turso", "drizzle", "vercel", "motion", "git", "github", "figma"] as TechKey[])
  .map(key => ({ name: techNames[key], icon: iconMap[key] }));

export interface Project {
  slug: string;
  title: string;
  imageTitle: string;
  src: string;
  lightModeSrc?: string;
  video: string;
  description: string;
  tech: TechItem[];
  github: string;
  live: string;
  backgroundImage?: string;
  hasPin: boolean;
  overview: string;
  features: string[];
  article?: string;
}
export const projectsData: Project[] = [
  {
    slug: "cablite", title: "CabLite", imageTitle: "Campus carpooling",
    src: "/projects/cablite-og.jpg", video: "", hasPin: false,
    backgroundImage: "/image copy 5.png",
    description: "Carpooling and rental sharing for BITS Goa, built around real campus travel.",
    tech: ["next", "react", "ts", "clerk", "tailwind"],
    github: "https://github.com/rawatpriyansh17/cablite-app", live: "https://cablite.xyz",
    overview: "I designed and built CabLite from Figma to production. It brings rides, rental shares, requests, approvals, and group conversations together for students in Goa. The project crossed 800 users.",
    features: ["Reactive Convex backend with Clerk identity and server-side request validation.", "Separate pending requests and confirmed passengers to keep seat availability consistent.", "Ride and rental group chats, notifications, and a personal phonebook.", "Curated Goa locations, MapLibre maps, and OSRM route previews."],
    article: "/blog/building-cablite",
  },
  {
    slug: "sitaram-seva-sansthan", title: "Sitaram Seva Sansthan", imageTitle: "NGO website",
    src: "/projects/ngo-og.webp", video: "", hasPin: false,
    backgroundImage: "/image copy.png",
    description: "An NGO website with donations, multilingual content, and Sarthi, its CMS-backed AI assistant.",
    tech: ["next", "ts", "turso", "razorpay", "vercel"],
    github: "https://github.com/rawatpriyansh17/SITARAMSEVASANSTHAN", live: "https://sitaramsevasansthan.org",
    overview: "The public website connects the NGO's programs, events, and donation options in one place. It reads content from a separate CMS and has helped generate ₹65,000+ in donations. Sarthi is part of this website: a multilingual assistant for finding programs, donation information, and useful links.",
    features: ["Razorpay order creation and signature verification, plus QR and bank-transfer options.", "CMS-managed posts, event galleries, and upcoming-program information.", "English and Hindi content with translation fallbacks.", "Sarthi streams answers grounded in CMS retrieval and verified site facts. Donation records stay separate from the content knowledge base."],
    article: "/blog/building-sarthi",
  },
  {
    slug: "ngo-cms", title: "NGO Content Studio", imageTitle: "Content management",
    src: "/projects/cms-og.webp", video: "", hasPin: false,
    backgroundImage: "/image copy 3.png",
    description: "The NGO's secured dashboard for posts, events, media, and Sarthi's knowledge updates.",
    tech: ["next", "ts", "clerk", "turso", "drizzle"],
    github: "https://github.com/rawatpriyansh17/ngocms", live: "https://dashboard.sitaramsevasansthan.org",
    overview: "The CMS gives the NGO control over its public content and media. It also owns the vector knowledge used by Sarthi, so content edits and AI knowledge updates follow the same lifecycle. The live dashboard requires sign-in.",
    features: ["Clerk-protected editing for posts, events, media, and the latest program flyer.", "ImageKit media uploads and ordered galleries.", "Turso/libSQL and Drizzle models with public read APIs for the website.", "Hash-based embedding refresh, protected vector search, and visible AI sync and retry states."],
    article: "/blog/building-sarthi",
  },
];
