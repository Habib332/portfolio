import { useEffect, useRef } from "react";

const TRAIL = 6; // number of ghost squares behind the main one
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const CustomCursor = () => {
  const els = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pts = Array.from({ length: TRAIL + 1 }, () => ({ ...mouse }));
    let scale = 1;
    let targetScale = 1;
    let scrollV = 0;
    let lastScroll = window.scrollY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onScroll = () => {
      scrollV += window.scrollY - lastScroll;
      lastScroll = window.scrollY;
    };
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select"
      );
      targetScale = hit ? 1.8 : 1;
    };

    const tick = () => {
      scrollV *= 0.9; // scroll energy fades out
      scale += (targetScale - scale) * 0.2;

      // while scrolling, the head drifts and spins, then settles back
      const offsetY = clamp(-scrollV * 1.2, -60, 60);
      const rotate = clamp(scrollV * 0.6, -45, 45);

      pts[0].x += (mouse.x - pts[0].x) * 0.35;
      pts[0].y += (mouse.y + offsetY - pts[0].y) * 0.35;

      // each ghost chases the one in front of it
      for (let i = 1; i <= TRAIL; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.3;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.3;
      }

      pts.forEach((p, i) => {
        const el = els.current[i];
        if (!el) return;
        const s = scale * (1 - i * 0.08);
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${rotate}deg) scale(${s})`;
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      {Array.from({ length: TRAIL + 1 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (els.current[i] = el)}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-md border-[1.5px] border-foreground [@media(pointer:fine)]:block"
          style={{ opacity: i === 0 ? 0.8 : 0.35 * (1 - i / (TRAIL + 1)) }}
        />
      ))}
    </>
  );
};

export default CustomCursor;