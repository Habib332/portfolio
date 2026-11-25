import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  strength?: number; // how far it follows the cursor (0 to 1)
  radius?: number; // how close the cursor must be, in px, beyond the button's edge
  className?: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function Magnetic({ children, strength = 0.35, radius = 80, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let tx = 0;
    let ty = 0;

    const reset = () => {
      tx = 0;
      ty = 0;
      el.style.transition = "transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1)";
      el.style.transform = "translate3d(0, 0, 0)";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      // use the un-shifted center so the effect doesn't feed back on itself
      const cx = r.left + r.width / 2 - tx;
      const cy = r.top + r.height / 2 - ty;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const near =
        Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;

      if (!near) {
        if (tx !== 0 || ty !== 0) reset();
        return;
      }
      tx = clamp(dx * strength, -14, 14);
      ty = clamp(dy * strength, -10, 10);
      el.style.transition = "transform 0.15s ease-out";
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", reset);
    };
  }, [strength, radius]);

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {children}
    </span>
  );
}