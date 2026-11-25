import { experience } from "@/data/config";
import SectionHeading from "./SectionHeading";
import ScrollFillText from "./ScrollFillText";

export default function Experience() {
  return (
    <section id="experience" className="container-mono py-24 md:py-32">
      <SectionHeading eyebrow="Community" title="Experience" />
      <ol className="relative ml-1.5 max-w-2xl space-y-10 border-l border-border">
        {experience.map((e) => (
          <li key={`${e.role}-${e.org}`} className="relative pl-8">
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-muted-foreground ring-4 ring-background" />
            {e.period && (
              <p className="mb-1 font-mono text-xs text-muted-foreground">{e.period}</p>
            )}
            <h3 className="font-display text-base font-semibold">{e.role}</h3>
            <p className="text-sm">{e.org}</p>
            <ScrollFillText
              text={e.description}
              className="mt-2 text-sm leading-relaxed text-muted-foreground"
            />
          </li>
        ))}
      </ol>
    </section>
  );
}