import { useEffect, useMemo, useRef, type ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function ScrollFillText({ text, as: Tag = "p", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85; // fill begins when the text's top reaches 85% down the screen
      const end = vh * 0.35; // ideal: fill is complete by about 35% down the screen

      // How far can this element's top actually travel? At the very bottom of the page
      // it can't go any higher than topAtMax, so the fill must finish by then.
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const topAtMax = rect.top - (maxScroll - window.scrollY);

      const idealRange = start - end + rect.height;
      const reachableRange = start - topAtMax;
      const range = Math.max(1, Math.min(idealRange, reachableRange));

      const progress = clamp((start - rect.top) / range, 0, 1);
      const n = spans.length;
      spans.forEach((s, i) => {
        const p = clamp(progress * n - i, 0, 1);
        s.style.opacity = String(0.18 + 0.82 * p);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Page height changes as images and the GitHub graph load, so re-measure when it does.
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };
  }, [words]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span data-w className="opacity-[0.18]">
            {w}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}