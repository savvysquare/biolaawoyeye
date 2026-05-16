import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowRight, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Media } from "@/lib/media";
import portrait from "@/assets/hero-portrait.jpg";
import ife from "@/assets/ife-landscape.jpg";
import waterImg from "@/assets/work-water.jpg";
import eduImg from "@/assets/work-education.jpg";
import elecImg from "@/assets/work-electricity.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hon. Abiola Jeremiah Awoyeye — Power to the People" },
      { name: "description", content: "Member, Osun State House of Assembly, Ife Central Constituency. 35+ completed projects since 2023. Now on the Accord Party platform." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: c = {} } = useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      const map: Record<string, string> = {};
      (data ?? []).forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const featured = projects.slice(0, 6);

  return (
    <div>
      {/* Editorial Grid Header — Hero */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge grid lg:grid-cols-12 min-h-[85vh]">
          <div className="lg:col-span-8 py-16 md:py-24 lg:pr-16 flex flex-col justify-center border-r border-dashed border-border">
            <p className="eyebrow text-grass font-bold tracking-[0.25em] mb-8">{c.hero_eyebrow ?? "CONSTITUENCY REPORT · IFE CENTRAL"}</p>
            <h1 className="display font-black text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] text-balance uppercase mb-10">
              {c.hero_title ?? "From neglect to 35+ projects."}
            </h1>
            <p className="max-w-xl text-lg md:text-2xl text-foreground/70 leading-[1.4] font-medium mb-12">
              {c.hero_subtitle ?? "Hon. Engr. Abiola Jeremiah Awoyeye is turning the manifesto into progress for Ife Central."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/works"
                className="group inline-flex items-center gap-3 rounded-full bg-grass px-8 py-4 text-base font-bold text-white hover:scale-105 transition shadow-xl shadow-grass/20"
              >
                SEE THE WORKS
                <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/manifesto"
                className="inline-flex items-center gap-3 rounded-full border-2 border-foreground/10 bg-sun px-8 py-4 text-base font-bold hover:bg-sun/80 transition"
              >
                READ MANIFESTO
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 bg-tint-sun/30 flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-sun)_0%,transparent_70%)] opacity-20" />
             <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border">
               <img src={portrait} alt="Hon. Abiola Awoyeye" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
             </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon — Crescent Style Grid */}
      <section className="border-b border-dashed border-border bg-tint-grass/20">
        <div className="container-edge grid sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: c.stat_projects ?? "35+", l: "COMPLETED PROJECTS" },
            { v: c.stat_wards ?? "11", l: "WARDS REACHED" },
            { v: c.stat_years ?? "2", l: "YEARS IN OFFICE" },
            { v: c.stat_communities ?? "20+", l: "COMMUNITIES SERVED" },
          ].map((s, i) => (
            <div key={s.l} className={`p-10 md:p-12 flex flex-col justify-center ${i < 3 ? 'sm:border-r border-dashed border-border' : ''}`}>
              <p className="display text-6xl md:text-7xl font-black tracking-tighter text-grass mb-4">{s.v}</p>
              <p className="text-[10px] font-black tracking-[0.2em] text-foreground/50 uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Narrative Section — Two Column Split */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge grid lg:grid-cols-12">
          <div className="lg:col-span-4 py-20 md:py-28 lg:pr-12 border-r border-dashed border-border">
            <p className="eyebrow mb-6">The Narrative</p>
            <h2 className="display text-4xl md:text-5xl font-bold leading-tight uppercase">
              A commitment to measurable impact.
            </h2>
          </div>
          <div className="lg:col-span-8 py-20 md:py-28 lg:pl-16">
            <blockquote className="mb-12">
              <p className="serif text-4xl md:text-6xl leading-[1.1] font-medium italic text-balance mb-8">
                “Water that hadn't run in twenty years came back in three weeks. We don't have to walk to the next ward anymore.”
              </p>
              <footer className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-sun grid place-items-center font-bold text-ink">MA</div>
                <div>
                  <p className="font-bold text-sm">Mama Adérónke</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">OAU Junior Staff Quarters</p>
                </div>
              </footer>
            </blockquote>
            <div className="prose prose-lg text-foreground/70 leading-relaxed font-medium">
              <p>
                The 2023 manifesto wasn't just a list of promises; it was a blueprint for restoration. 
                In twenty-four months, we have moved from strategic planning to concrete results across all eleven wards of Ife Central.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Works Grid — Editorial Style */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge py-20 md:py-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <p className="eyebrow mb-6 text-grass">Portfolio of Progress</p>
              <h2 className="display text-5xl md:text-7xl font-black leading-[0.95] uppercase">
                From manifesto to concrete reality.
              </h2>
            </div>
            <Link to="/works" className="group inline-flex items-center gap-2 text-sm font-bold border-b-2 border-foreground pb-1 hover:text-grass hover:border-grass transition-all uppercase">
              VIEW ALL {projects.length} PROJECTS <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {featured.map((p) => {
              const media = ((p.media as Media[]) ?? [])[0];
              return (
                <Link
                  key={p.id}
                  to="/works"
                  className="group bg-background p-8 hover:bg-tint-sun/10 transition-colors"
                >
                  <div className="aspect-[16/10] bg-muted overflow-hidden rounded-xl mb-8 border border-border/50">
                    {media?.type === "image" ? (
                      <img src={media.url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                    ) : (
                      <div className="h-full w-full grid place-items-center bg-tint-sun/50">
                        <span className="display text-4xl font-black text-grass/30 uppercase">{p.category[0]}</span>
                      </div>
                    )}
                  </div>
                  <p className="eyebrow text-[10px] text-grass mb-3 uppercase">{p.category}</p>
                  <h3 className="display text-2xl font-bold mb-4 group-hover:text-grass transition-colors uppercase">{p.title}</h3>
                  <p className="text-sm text-foreground/60 line-clamp-3 leading-relaxed">{p.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action — Impactful End */}
      <section className="container-edge py-32 md:py-48 text-center bg-tint-sun/5">
        <div className="max-w-4xl mx-auto">
          <p className="eyebrow mb-8 text-grass">Join the movement</p>
          <h2 className="display text-5xl md:text-8xl font-black leading-[0.9] uppercase mb-12">
            The work is <span className="text-grass italic">just beginning.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-grass px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-grass/30 hover:scale-105 transition uppercase">
              BECOME A VOLUNTEER <ArrowUpRight size={24} />
            </Link>
            <Link to="/manifesto" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full border-2 border-foreground px-10 py-5 text-lg font-bold hover:bg-foreground hover:text-background transition uppercase">
              READ THE MANIFESTO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
