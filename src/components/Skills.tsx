import { skills } from "@/data/config";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="container-mono py-24 md:py-32">
      <SectionHeading eyebrow="Toolbox" title="Skills & tools" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {skills.map(({ name, category, Icon, color }) => (
          <div
            key={name}
            className="spotlight flex flex-col gap-4 p-4 rounded-lg border border-border bg-card transition-colors hover:bg-accent"
          >
            <Icon className="h-6 w-6" style={color ? { color } : undefined} />
            <div>
              <p className="text-sm font-medium leading-tight">{name}</p>
              <p className="text-xs text-muted-foreground mt-1">{category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}