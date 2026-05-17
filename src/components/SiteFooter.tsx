import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-20">
      <div className="container-edge">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 group mb-8">
              <div className="h-10 w-10 rounded-xl bg-grass grid place-items-center text-white font-bold text-lg shadow-lg shadow-grass/20 group-hover:rotate-12 transition-transform">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="display text-lg font-bold tracking-tight">Hon. Abiola J. Awoyeye</span>
                <span className="text-[10px] text-muted-foreground font-medium italic">Representative, Ife Central</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-10">
              Transforming the legislative mandate into measurable progress for the people of Ife Central. Committed to data-driven governance and empathy.
            </p>
            <div className="flex gap-4">
              {["Twitter", "Instagram", "LinkedIn", "Facebook"].map((s) => (
                <a key={s} href="#" className="h-10 w-10 rounded-full bg-cream border border-border/50 grid place-items-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
                   <span className="sr-only">{s}</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-current" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              {["Home", "About", "Works", "Manifesto", "Contact"].map((l) => (
                <li key={l}>
                  <Link to={l === "Home" ? "/" : `/${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h4 className="text-sm font-bold mb-6">Join the movement</h4>
            <p className="text-sm text-muted-foreground mb-8">
              Stay updated on projects and community initiatives. Be the first to know when the work expands.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-cream border border-border/50 rounded-full px-6 py-3 text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-grass"
              />
              <button className="pill-button bg-foreground text-background text-xs">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col items-center justify-center text-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Hon. Engr. Abiola Jeremiah Awoyeye</p>
          <p>Powered by Hon. Abiola J. Awoyeye • Ife Central</p>
        </div>
      </div>
    </footer>
  );
}
