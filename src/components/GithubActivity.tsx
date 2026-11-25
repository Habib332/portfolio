import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/data/config";
import ScrollFillText from "./ScrollFillText";
type Day = { date: string; count: number; level: number };
type ApiResponse = { contributions?: Day[]; total?: { lastYear?: number } };

export default function GitHubActivity() {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function load() {
      setLoading(true);
      setFailed(false);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${site.githubUser}?y=last`,
          { signal: ctrl.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiResponse = await res.json();
        if (!ctrl.signal.aborted) {
          setDays(data.contributions ?? []);
          setTotal(data.total?.lastYear ?? null);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setFailed(true);
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => ctrl.abort();
  }, []);

  // Pad the first week so rows line up with weekdays, then lay cells out column by column.
  const { cells, weekCount } = useMemo(() => {
    if (!days.length) return { cells: [] as (Day | null)[], weekCount: 0 };
    const offset = new Date(`${days[0].date}T00:00:00`).getDay();
    const all: (Day | null)[] = [...Array(offset).fill(null), ...days];
    while (all.length % 7 !== 0) all.push(null);
    return { cells: all, weekCount: all.length / 7 };
  }, [days]);

  // On small screens, start scrolled to the most recent weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [cells]);

  const profileUrl = `https://github.com/${site.githubUser}`;

  return (
    <section id="github" className="container-mono py-24 md:py-32">
      <ScrollFillText
  as="h2"
  text="GitHub activity"
  className="mb-8 text-3xl md:text-4xl font-semibold text-foreground"
/>
      <p className="mb-4 font-mono text-xs text-muted-foreground">@{site.githubUser}</p>

      <div
        ref={scrollRef}
        role="img"
        aria-label={
          total === null
            ? "GitHub contribution graph"
            : `GitHub contribution graph: ${total} contributions in the last year`
        }
        className="overflow-x-auto pb-2"
      >
        <div
          className="grid grid-flow-col grid-rows-7 gap-1"
          style={{ gridTemplateColumns: `repeat(${weekCount || 53}, minmax(14px, 1fr))` }}
        >
          {cells.map((d, i) =>
            d ? (
              <span
                key={d.date}
                title={`${d.count} contributions on ${d.date}`}
                className="aspect-square w-full rounded-[3px]"
                style={{ background: `var(--gh-${Math.min(Math.max(d.level, 0), 4)})` }}
              />
            ) : (
              <span key={`pad-${i}`} className="aspect-square w-full" />
            )
          )}
        </div>
      </div>

      <p className="mt-3 font-mono text-xs text-muted-foreground">
        {failed ? (
          <a
            href={profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-4 hover:text-foreground"
          >
            View activity on GitHub
          </a>
        ) : loading ? (
          "Loading…"
        ) : (
          `${total ?? 0} contributions in the last year`
        )}
      </p>
    </section>
  );
}