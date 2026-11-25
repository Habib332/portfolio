import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { nav, site } from "@/data/config";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState<string | null>(null);
  const [bar, setBar] = useState({ left: 0, width: 0 });
  const [animate, setAnimate] = useState(false);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Work out which section is being read.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      if (atBottom) {
        current = nav[nav.length - 1].href;
      } else {
        for (const item of nav) {
          const el = document.querySelector(item.href);
          if (el && el.getBoundingClientRect().top <= vh * 0.4) current = item.href;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Position the sliding underline under the active link.
  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? linkRefs.current[active] : null;
      if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Don't slide in from the far left the first time the underline appears.
  useEffect(() => {
    if (active && !animate) {
      const t = window.setTimeout(() => setAnimate(true), 60);
      return () => window.clearTimeout(t);
    }
  }, [active, animate]);

  const handleToggle = () => {
    const root = document.documentElement;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 450);
    }
    toggle();
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="container-mono flex h-16 items-center justify-between">
        <a href="#top" className="font-display font-semibold tracking-tight text-base">
          {site.name.split(" ")[0]}<span className="text-muted-foreground">.</span>
        </a>

        <nav className="relative hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => {
                linkRefs.current[item.href] = el;
              }}
              className={`transition-colors hover:text-foreground ${
                active === item.href ? "text-foreground" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
          <span
            aria-hidden
            className={`pointer-events-none absolute -bottom-2 h-px bg-foreground ${
              animate ? "transition-all duration-300 ease-out" : ""
            }`}
            style={{ left: bar.left, width: bar.width, opacity: active ? 1 : 0 }}
          />
        </nav>

        <button
          onClick={handleToggle}
          aria-label="Toggle theme"
          className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border hover:bg-accent transition-colors"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}