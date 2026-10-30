import { Mail } from "lucide-react";
import { PageFrame } from "@/components/PageFrame";
export default function ContactPage() {
  return <PageFrame title="Contact" subtitle="Let’s build something useful."><section className="py-10"><h1 className="text-2xl font-semibold tracking-tight">Say hello.</h1><p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">Have a project in mind or want to talk about something I’ve built? Send me an email.</p><a href="mailto:priyanshrawat888@gmail.com" className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4"><Mail className="h-4 w-4" />priyanshrawat888@gmail.com</a></section></PageFrame>;
}
