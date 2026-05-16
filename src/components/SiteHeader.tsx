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
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-dashed border-border"
          : "bg-background border-b border-transparent"
      }`}
    >
      <div className="container-edge flex h-24 items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <span className="relative grid h-12 w-12 place-items-center rounded-full bg-sun ring-2 ring-grass shadow-xl shadow-grass/10 group-hover:scale-105 transition-transform duration-500">
            <span className="display text-xl font-black text-grass">A</span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="display text-xl md:text-2xl font-black tracking-tighter text-foreground uppercase">Hon. Abiola Awoyeye</span>
            <span className="text-[10px] font-black tracking-[0.2em] text-foreground/40 uppercase mt-1">Constituency Report</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[11px] font-black tracking-[0.2em] text-foreground/40 hover:text-grass transition-colors uppercase"
              activeProps={{ className: "text-grass" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-4 inline-flex items-center rounded-full bg-grass px-6 py-2.5 text-xs font-black tracking-widest text-white hover:bg-ink hover:scale-105 transition-all uppercase"
          >
            JOIN THE TEAM
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid place-items-center h-12 w-12 rounded-full border border-border"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-dashed border-border bg-background animate-in slide-in-from-top-4 duration-300">
          <div className="container-edge py-10 flex flex-col gap-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-2xl font-black uppercase tracking-tighter"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-grass px-5 py-4 text-sm font-black text-white uppercase tracking-widest"
            >
              JOIN THE TEAM
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
