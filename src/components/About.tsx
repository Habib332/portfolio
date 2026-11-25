import { about, site } from "@/data/config";
import SectionHeading from "./SectionHeading";
import ScrollFillText from "./ScrollFillText";

export default function About() {
  return (
    <section id="about" className="container-mono py-24 md:py-32">
      <SectionHeading eyebrow="Bio" title="About" />
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          {about.paragraphs.map((p, i) => (
            <ScrollFillText key={i} text={p} className="text-lg md:text-xl leading-relaxed text-foreground" />
          ))}
        </div>
        <dl className="reveal space-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground">University</dt>
            <dd className="font-medium">{site.university}</dd>
            <dd className="text-muted-foreground">{site.degree}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Location</dt>
            <dd className="font-medium">{site.location}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">
              <a href={`mailto:${site.email}`} className="hover:underline underline-offset-4">
                {site.email}
              </a>
            </dd>
          </div>
          {site.status && (
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">{site.status}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}