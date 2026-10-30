import Link from "next/link";
import { ArrowUpRight, Calendar, Clock3 } from "lucide-react";
import { getAllBlogs } from "@/util/mdx_clean";

export async function BlogList() {
  const blogs = await getAllBlogs();
  return (
    <div className="block">
      {blogs.map((blog) => (
        <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group relative block -mx-4 px-4 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors border-b border-dashed border-black/20 dark:border-white/15">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-[14px] md:text-[15px] font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{blog.title}</h3>
              <p className="mt-2 text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">{blog.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5"><Calendar className="size-3.5" aria-hidden="true" /><time dateTime={blog.date}>{new Date(blog.date ?? "2026-10-29").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}</time></span>
                <span className="flex items-center gap-1.5"><Clock3 className="size-3.5" aria-hidden="true" />{blog.readingMinutes} min read</span>
                <span className="flex flex-wrap gap-2">{blog.tags?.slice(0, 3).map(tag => <span key={tag} className="px-2 py-0.5 rounded-[4px] border border-black/20 dark:border-white/15 text-[11px]">{tag}</span>)}</span>
              </div>
            </div>
            <ArrowUpRight className="size-4 shrink-0 mt-0.5 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-100" aria-hidden="true" />
          </div>
        </Link>
      ))}
    </div>
  );
}
