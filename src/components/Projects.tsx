import { useEffect, useRef, useState } from "react";
import { Eye, Github, Maximize2, X } from "lucide-react";
import { projects, type Project } from "@/data/config";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";

function Bar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse motion-reduce:animate-none rounded bg-foreground/10 ${className}`}
    />
  );
}

function ProjectCard({
  p,
  index,
  onOpenLightbox,
}: {
  p: Project;
  index: number;
  onOpenLightbox: (project: Project) => void;
}) {
  const [shotLoaded, setShotLoaded] = useState(!p.screenshot);
  const [minDone, setMinDone] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Start the skeleton timer once the card scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let minTimer: number | undefined;
    let safety: number | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        minTimer = window.setTimeout(() => setMinDone(true), reduce ? 0 : 900 + (index % 2) * 250);
        safety = window.setTimeout(() => setShotLoaded(true), 6000); // never get stuck
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(minTimer);
      window.clearTimeout(safety);
    };
  }, [index]);

  const loaded = shotLoaded && minDone;

  return (
    <article ref={ref} className="flex flex-col">
      {/* Cover */}
      <Tilt max={3}>
        <div
          className="group relative aspect-video overflow-hidden rounded-2xl bg-muted"
          style={!p.screenshot ? { background: p.cover.gradient } : undefined}
        >
          {p.screenshot ? (
            <>
              <button
                type="button"
                onClick={() => onOpenLightbox(p)}
                aria-label={`Expand ${p.title} screenshot`}
                className="block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={p.screenshot}
                  alt={`${p.title} screenshot`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setShotLoaded(true)}
                  onError={() => setShotLoaded(true)}
                  className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>

              {loaded && (
                <button
                  type="button"
                  onClick={() => onOpenLightbox(p)}
                  aria-label={`Zoom ${p.title} screenshot`}
                  className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>Click to enlarge</span>
                </button>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                {p.logo && (
                  <img src={p.logo} alt="" className="h-3.5 w-3.5 rounded-sm object-contain" />
                )}
                {p.cover.eyebrow}
              </span>
              <h3 className="mt-5 text-3xl font-semibold leading-[1.08] tracking-tight text-white md:text-4xl lg:text-[2.6rem]">
                {p.cover.headline}
                <span className="block font-medium italic text-white/90">{p.cover.accent}</span>
              </h3>
              <p className="mt-4 text-sm text-white/70">{p.cover.sub}</p>
            </div>
          )}

          {p.demo && loaded && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`View ${p.title} live`}
              className="absolute bottom-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transition-transform duration-300 hover:scale-110"
            >
              <Eye className="h-5 w-5" />
            </a>
          )}

          {!loaded && (
            <div className="absolute inset-0 z-20 animate-pulse motion-reduce:animate-none bg-muted" />
          )}
        </div>
      </Tilt>

      {/* Details: real content keeps its height; skeleton sits on top while loading */}
      <div className="relative mt-6">
        <div
          className={`transition-opacity duration-500 ${
            loaded ? "opacity-100" : "invisible opacity-0"
          }`}
        >
          {p.badge && (
            <span className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
              {p.badge}
            </span>
          )}
          <p className="text-sm text-muted-foreground">{p.category}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{p.title}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{p.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">{p.tags.join(" · ")}</p>

          <div className="mt-6 flex items-center justify-between gap-4">
            {p.stat ? (
              <span className="rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground">
                {p.stat}
              </span>
            ) : (
              <span />
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" /> Code
              </a>
            )}
          </div>
        </div>

        {!loaded && (
          <div className="absolute inset-0 flex flex-col gap-3" aria-hidden>
            <Bar className="h-4 w-24" />
            <Bar className="h-7 w-3/4" />
            <Bar className="h-3 w-full" />
            <Bar className="h-3 w-2/3" />
            <Bar className="mt-2 h-4 w-1/2" />
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProject]);

  return (
    <section id="projects" className="container-mono py-24 md:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        description="A small selection of things I've built recently."
      />
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} p={p} index={i} onOpenLightbox={setActiveProject} />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeProject?.screenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} full preview`}
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
              <div>
                <p className="text-xs text-white/60">{activeProject.category}</p>
                <h4 className="font-display text-base font-semibold">{activeProject.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Live demo
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  aria-label="Close preview"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="overflow-auto">
              <img
                src={activeProject.screenshot}
                alt={`${activeProject.title} full screenshot`}
                className="block max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}