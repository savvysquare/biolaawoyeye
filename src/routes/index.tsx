import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Media } from "@/lib/media";
import ife from "@/assets/home-image.webp";
import { mapToPillar } from "@/lib/pillars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hon. Abiola Jeremiah Awoyeye — Power to the People" },
      { name: "description", content: "Member, Osun State House of Assembly, Ife Central State Constituency. 37 completed projects since 2023. Now on the Accord Party platform." },
    ],
  }),
  component: Home,
});

function Home() {
  const [altTitle, setAltTitle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAltTitle((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { data: c = {} } = useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      const map: Record<string, string> = {};
      (data ?? []).forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });

  const { data: rawProjects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const projects = useMemo(() => {
    return rawProjects.map(p => ({
      ...p,
      category: mapToPillar(p.category),
      media: [{ type: "image", url: `/projects/${p.sort_order}.webp` }]
    }));
  }, [rawProjects]);

  const featured = projects.slice(0, 6);

  return (
    <div className="bg-background">
      {/* Hero — Fourmula.ai Centered Style */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container-edge text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tint-grass text-grass border border-grass/10 text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            Hon. Abiola J. Awoyeye · Ife Central
          </div>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1] max-w-5xl mb-8 grid animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className={`col-start-1 row-start-1 transition-opacity duration-1000 ${altTitle ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              From neglect to 37+ projects.
            </span>
            <span className={`col-start-1 row-start-1 transition-opacity duration-1000 ${altTitle ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              Power restored to the People.
            </span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Hon. Engr. Abiola Jeremiah Awoyeye — Member representing Ife Central State Constituency at the Osun State House of Assembly. Three years in. 37 completed projects. One promise kept: service.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <Link to="/works" className="pill-button pill-button-primary bg-grass text-white shadow-xl shadow-grass/20 px-8 py-4 rounded-full font-bold inline-flex items-center">
              See the works
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/manifesto" className="pill-button pill-button-secondary bg-sun text-ink border-sun px-8 py-4 rounded-full font-bold">
              Read manifesto
            </Link>
          </div>

          <div className="mt-20 relative w-full max-w-5xl">
            <div className="absolute -inset-10 bg-sun/10 blur-[120px] rounded-full -z-10" />
            <div className="relative aspect-[4/3] md:aspect-[3/2] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border bg-muted">
               <img src={ife} alt="Ife Central" className="h-full w-full object-cover object-top md:grayscale md:hover:grayscale-0 transition-all duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon — Clean & Minimal */}
      <section className="py-20 bg-cream">
        <div className="container-edge">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { v: c.stat_projects ?? "37", l: "Completed projects" },
              { v: c.stat_wards ?? "11", l: "Wards reached" },
              { v: "3", l: "Years in office" },
              { v: c.stat_communities ?? "20+", l: "Communities served" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col text-center">
                <p className="display text-4xl md:text-5xl font-bold text-grass mb-2">{s.v}</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section — Centered refined quote */}
      <section className="py-32">
        <div className="container-edge">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-grid h-12 w-12 place-items-center rounded-full bg-tint-sun text-sun mb-10">
              <Quote size={20} fill="currentColor" />
            </div>
            <p className="serif text-4xl md:text-5xl lg:text-6xl italic leading-tight text-foreground mb-12">
              “Water that hadn't run in twenty years came back in three weeks. We don't have to walk to the next ward anymore.”
            </p>
            <footer className="flex flex-col items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-sun grid place-items-center font-bold text-ink shadow-lg">MA</div>
              <div className="text-center">
                <p className="font-bold text-lg">Mama Aderonke</p>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">OAU Junior Staff Quarters</p>
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* Featured Works — Modern Cards */}
      <section className="py-32 bg-cream">
        <div className="container-edge">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20">
            <div className="max-w-xl">
              <div className="eyebrow mb-4">Portfolio of progress</div>
              <h2 className="display text-4xl md:text-5xl font-bold">From manifesto to concrete reality.</h2>
            </div>
            <Link to="/works" className="pill-button pill-button-secondary px-8 py-4 rounded-full font-bold border border-foreground/10">
              View all {projects.length} projects
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => {
              const media = ((p.media as Media[]) ?? [])[0];
              return (
                <Link
                  key={p.id}
                  to="/works"
                  className="group block bg-background rounded-[2rem] p-4 border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="aspect-[16/10] bg-muted overflow-hidden rounded-[1.5rem] mb-6">
                    {media?.type === "image" ? (
                      <img src={media.url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full grid place-items-center bg-tint-grass">
                        <span className="display text-4xl font-bold text-grass/20">{p.category[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-xs font-bold text-grass uppercase tracking-wider mb-2">{p.category}</p>
                    <h3 className="display text-xl font-bold mb-3 group-hover:text-grass transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section — Clean Text Split */}
      <section className="py-32 border-t border-border">
        <div className="container-edge grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow mb-6">Our commitment</div>
            <h2 className="display text-4xl md:text-6xl font-bold mb-8">
              Governance driven by data and empathy.
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              The 2023 manifesto wasn't just a list of promises; it was a blueprint for restoration. 
              In thirty-six months, we have moved from strategic planning to concrete results across all eleven wards of Ife Central.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-square bg-tint-sun rounded-[3rem] p-12 relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sun/20 blur-[80px] rounded-full" />
              <div className="relative text-center">
                <p className="display text-8xl font-bold text-sun mb-4">37</p>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/40">Projects delivered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — Fourmula Card Style */}
      <section className="container-edge py-32">
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(0,135,81,0.2),transparent_70%)]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-8 uppercase tracking-widest">Join the movement</div>
            <h2 className="display text-5xl md:text-7xl font-bold mb-10 leading-[1.1]">
              The work is just beginning.
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/contact" className="pill-button bg-sun text-ink hover:scale-105 shadow-xl shadow-sun/20 px-8 py-4 rounded-full font-bold">
                Become a volunteer
              </Link>
              <Link to="/manifesto" className="pill-button border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full font-bold text-white">
                Read the manifesto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
