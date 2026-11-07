import { Crosshair, Keyboard, Trophy, Palette, HardDrive, Download } from "lucide-react";
import { TypedefShowcase } from "@/components/TypedefShowcase";

const featureIcons = [Crosshair, Keyboard, Trophy, Palette, HardDrive, Download];
export function TypedefDetails({ features }: { features: string[] }) {
  return <>
    <TypedefShowcase />
    <h2 className="text-lg font-semibold mt-10 mb-4">Under the hood</h2>
    <ul className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      {features.map((feature, index) => {
        const Icon = featureIcons[index] ?? Crosshair;
        return <li key={feature} className="flex items-start gap-3"><Icon aria-hidden="true" className="mt-1 size-4 shrink-0 text-zinc-500" /><span>{feature}</span></li>;
      })}
    </ul>
  </>;
}
