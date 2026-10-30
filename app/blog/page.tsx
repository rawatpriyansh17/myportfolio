import type { Metadata } from "next";
import { PageFrame } from "@/components/PageFrame";
import { BlogList } from "@/components/BlogList";
export const metadata: Metadata = { title: "Blog | Priyansh Rawat", description: "Engineering notes from building CabLite and Sarthi." };
export default function BlogIndex() {
  return <PageFrame title="Blog" subtitle="Notes from building and shipping">
    <h1 className="sr-only">Engineering notes</h1>
    <p className="py-6 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">Decisions, tradeoffs, and lessons from the products I build. Written from the implementation, with links to the code.</p>
    <BlogList />
  </PageFrame>;
}
