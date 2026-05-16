import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/works", label: "Works" },
  { to: "/manifesto", label: "Manifesto" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all py-6 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-background/0"
      }`}
    >
      <div className="container-edge flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-grass grid place-items-center text-white font-bold text-lg shadow-lg shadow-grass/20 group-hover:rotate-12 transition-transform">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="display text-lg font-bold tracking-tight">Hon. Abiola Awoyeye</span>
            <span className="text-[10px] text-muted-foreground font-medium">Ife Central Representation</span>
          </div>
        </Link>

        {/* Desktop Nav — Pill Styled */}
        <nav className="hidden md:flex items-center bg-cream/50 backdrop-blur-sm border border-border/50 rounded-full px-2 py-1.5 gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] font-semibold px-4 py-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-background transition-all"
              activeProps={{ className: "text-foreground bg-background shadow-sm" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="pill-button bg-foreground text-background text-[13px] hover:scale-105"
          >
            Join the team
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid place-items-center h-10 w-10 rounded-full bg-cream border border-border/50"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav — Clean Slide Down */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border animate-in slide-in-from-top-4 duration-300">
          <div className="container-edge py-8 flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-xl font-bold px-4 py-2 hover:text-grass transition-colors"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 pill-button bg-grass text-white py-4"
            >
              Join the team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
