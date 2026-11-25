import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  max?: number; // max tilt in degrees
  className?: string;
};

export default function Tilt({ children, max = 6, className = "" }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const inner = innerRef.current;
    if (!inner || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // measure the outer (un-rotated) box so the tilt stays stable
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 to 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;

    inner.style.transition = "transform 0.12s ease-out";
    inner.style.transform = `rotateX(${(-py * max * 2).toFixed(2)}deg) rotateY(${(px * max * 2).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transition = "transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)";
    inner.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`h-full ${className}`}
      style={{ perspective: "900px" }}
    >
      <div ref={innerRef} className="h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}