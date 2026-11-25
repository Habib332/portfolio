import { ArrowDownToLine, Mail } from "lucide-react";
import { site } from "@/data/config";
import Magnetic from "./Magnetic";

export default function Hero() {
  return (
    <section id="top" className="container-mono pt-24 pb-32 md:pt-36 md:pb-40">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
        {/* Text */}
        <div>
          {site.heroBadge && (
            <p className="reveal text-sm text-muted-foreground mb-6 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
              {site.heroBadge}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold leading-[1.05] mb-6">
            <span className="block overflow-hidden pb-[0.1em]">
              <span className="hero-rise block" style={{ animationDelay: "100ms" }}>
                {site.name}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <span
                className="hero-rise block text-muted-foreground font-normal"
                style={{ animationDelay: "280ms" }}
              >
                {site.role}.
              </span>
            </span>
          </h1>
          <p className="reveal max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
            {site.bio}
          </p>
          <div className="reveal flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Hello Habib")}`}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/cv.pdf"
                download="Habib_Ahmed_CV.pdf"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-md border border-border text-sm font-medium hover:bg-accent transition-colors"
              >
                <ArrowDownToLine className="h-4 w-4" />
                Download CV
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Photo */}
        <figure className="hero-fade w-52 sm:w-56 lg:w-64" style={{ animationDelay: "450ms" }}>
          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src="/profile.webp"
              alt={`Portrait of ${site.name}`}
              width={640}
              height={800}
              decoding="async"
              className="h-full w-full object-cover grayscale-[60%] contrast-105 transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-4">
            <p className="text-sm font-medium">{site.name}</p>
            <p className="text-sm text-muted-foreground">{site.role}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}