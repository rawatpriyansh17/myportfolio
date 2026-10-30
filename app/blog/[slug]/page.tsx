import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock3 } from "lucide-react";
import { PageFrame } from "@/components/PageFrame";
import { getSingleBlog, getAllBlogs, headingId } from "@/util/mdx_clean";

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getAllBlogs()).map(post => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await getSingleBlog((await params).slug);
    return { title: `${data.title} | Priyansh Rawat`, description: data.description, authors: [{ name: "Priyansh Rawat" }] };
  } catch { return { title: "Post not found | Priyansh Rawat" }; }
}
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug).catch(() => null);
  if (!blog) notFound();
  const { data, content } = blog;
  const headings = Array.from(content.matchAll(/^## (.+)$/gm), match => match[1]);
  const related = (await getAllBlogs()).filter(post => post.slug !== slug);
  return <PageFrame title="Blog" subtitle="Engineering notes" back="/blog">
    <article className="py-8">
      <h1 className="text-3xl sm:text-[34px] font-semibold tracking-tight leading-tight text-zinc-900 dark:text-zinc-100">{data.title}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{data.description}</p>
      <div className="my-5 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Priyansh Rawat</span>
        <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /><time dateTime={data.date}>{new Date(data.date ?? "2026-10-29").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time></span>
        <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" />{data.readingMinutes} min read</span>
      </div>
      {data.image && <Image src={data.image} alt={data.imageAlt ?? data.title ?? "Article cover"} width={1536} height={864} priority sizes="(min-width: 768px) 40vw, 100vw" className="w-full aspect-video object-cover rounded-lg border border-black/5 dark:border-white/10" />}
      <details className="my-8 rounded-lg border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
        <summary className="cursor-pointer font-medium text-zinc-800 dark:text-zinc-200">In this article</summary>
        <nav aria-label="Article contents" className="mt-3 flex flex-col gap-2">{headings.map(title => <a className="hover:text-zinc-900 dark:hover:text-white" href={`#${headingId(title)}`} key={title}>{title}</a>)}</nav>
      </details>
      <div className="prose prose-zinc dark:prose-invert max-w-none text-[15px] leading-[1.85] prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-10 prose-h2:scroll-mt-8 prose-a:decoration-zinc-400 prose-a:underline-offset-4 prose-pre:text-xs prose-pre:bg-zinc-950 prose-pre:rounded-lg prose-img:rounded-lg prose-blockquote:font-normal">
        <MDXRemote source={content} components={{ h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2> }} />
      </div>
    </article>
    <aside className="py-6 border-t border-dashed border-zinc-300 dark:border-zinc-800">
      <h2 className="text-sm font-semibold mb-3">Read next</h2>
      {related.map(post => <Link className="block text-sm text-zinc-600 dark:text-zinc-400 underline underline-offset-4" key={post.slug} href={`/blog/${post.slug}`}>{post.title}</Link>)}
    </aside>
    <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-500"><ArrowLeft className="size-4" />All posts</Link>
  </PageFrame>;
}
