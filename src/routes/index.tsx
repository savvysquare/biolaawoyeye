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
      {/* Hero — Adeleke style vibrant gradient */}
      <section className="container-edge pt-16 md:pt-24 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-sun via-sun/80 to-gold/40 -z-10 opacity-60 blur-3xl animate-pulse" />
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 pt-6">
            <p className="eyebrow text-ink/80 font-bold tracking-[0.3em]">{c.hero_eyebrow ?? "CONSTITUENCY REPORT · IFE CENTRAL"}</p>
            <h1 className="mt-8 display font-black text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] text-balance text-foreground drop-shadow-sm uppercase">
              {c.hero_title ?? "How Ife Central went from neglect to 35+ projects."}
            </h1>
            <p className="mt-8 max-w-xl text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
              {c.hero_subtitle ?? "Hon. Engr. Abiola Jeremiah Awoyeye is turning the manifesto into progress. The work continues on the Accord Party platform."}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/works"
                className="group inline-flex items-center gap-3 rounded-full bg-grass px-8 py-4 text-base font-bold text-white hover:scale-105 transition shadow-lg shadow-grass/20"
              >
                SEE THE WORKS
                <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/manifesto"
                className="inline-flex items-center gap-3 rounded-full border-2 border-foreground/10 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-bold hover:bg-white hover:border-foreground transition"
              >
                READ MANIFESTO
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-sun/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-tint-grass ring-8 ring-white shadow-2xl">
              <img src={portrait} alt="Hon. Engr. Abiola Jeremiah Awoyeye" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700" width={1024} height={1280} />
            </div>
          </div>
        </div>

        {/* Stat tiles — vibrant style */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { v: c.stat_projects ?? "35+", l: "COMPLETED PROJECTS", tone: "bg-sun shadow-sun/20" },
            { v: c.stat_wards ?? "11", l: "WARDS REACHED", tone: "bg-grass text-white shadow-grass/20" },
            { v: c.stat_years ?? "2", l: "YEARS IN OFFICE", tone: "bg-sun shadow-sun/20" },
            { v: c.stat_communities ?? "20+", l: "COMMUNITIES SERVED", tone: "bg-grass text-white shadow-grass/20" },
          ].map((s) => (
            <div key={s.l} className={`${s.tone} rounded-3xl p-8 md:p-10 transition-transform hover:-translate-y-1 shadow-xl`}>
              <p className="display text-6xl md:text-7xl font-black tracking-tighter">{s.v}</p>
              <p className="mt-6 text-xs font-black tracking-[0.2em] opacity-80">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PULL QUOTE — Crescent block */}
      <section className="border-y border-dashed border-border">
        <div className="container-edge py-16 md:py-24 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-3">
            <div className="inline-grid h-10 w-10 place-items-center rounded-full bg-foreground text-background">
              <Quote size={16} />
            </div>
            <p className="eyebrow mt-4">In their own words</p>
          </div>
          <blockquote className="md:col-span-9">
            <p className="display text-2xl md:text-4xl leading-[1.2] font-medium text-balance">
              “Water that hadn't run in twenty years came back in three weeks. We don't have to walk to the next ward anymore.”
            </p>
            <footer className="mt-6 flex items-center gap-3 text-sm">
              <span className="h-9 w-9 rounded-full bg-tint-grass grid place-items-center text-grass font-medium">MA</span>
              <span>
                <span className="font-medium">Mama Adérónke</span>
                <span className="text-muted-foreground"> — OAU Junior Staff Quarters</span>
              </span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* PILLARS — original manifesto pillars */}
      <section className="container-edge py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <p className="eyebrow">The original five pillars</p>
            <h2 className="mt-4 display text-4xl md:text-5xl font-semibold text-balance">
              Five promises. One constituency. Measurable results.
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-10 text-foreground/70 max-w-xl">
            These are the five pillars Hon. Awoyeye contested on in 2023. Every project on this site is tied to one of them — and the lessons learned are now shaping a sharper set of priorities for the next term.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { img: eduImg, k: "Education", v: "Classrooms rebuilt, scholarships awarded, teachers and pupils equipped." },
            { img: ife, k: "Healthcare", v: "OSHI enrolment, medical outreaches, support for the elderly and PWDs." },
            { img: waterImg, k: "Social & Welfare Infrastructure", v: "Solar boreholes, street lights, transformers, roads — the everyday backbone of life in Ife Central." },
            { img: elecImg, k: "Security", v: "Operational support to local security outfits, lighting up dark corners, legal aid for the vulnerable." },
            { img: ife, k: "SME Support", v: "Empowerment grants, women's vocational training (1,500+), youth start-up kits." },
            { img: waterImg, k: "Youth, Sports & Special Needs", v: "Championed at the State Assembly as Chairman of the House Committee — tournaments, athlete support, inclusion programmes." },
          ].map((p) => (
            <article key={p.k} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <img src={p.img} alt={p.k} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-[1.02]" />
              </div>
              <h3 className="display text-xl font-medium mt-5">{p.k}</h3>
              <p className="mt-2 text-sm text-foreground/70">{p.v}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURED WORKS */}
      <section className="border-t border-dashed border-border">
        <div className="container-edge py-20 md:py-28">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Recent works</p>
              <h2 className="mt-3 display text-3xl md:text-5xl font-semibold">From manifesto to concrete.</h2>
            </div>
            <Link to="/works" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-grass">
              All {projects.length} projects <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => {
              const media = ((p.media as Media[]) ?? [])[0];
              return (
                <Link
                  key={p.id}
                  to="/works"
                  className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/40 transition"
                >
                  <div className="aspect-[16/10] bg-muted overflow-hidden">
                    {media?.type === "image" ? (
                      <img src={media.url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition" />
                    ) : media?.type === "video" ? (
                      <video src={media.url} className="h-full w-full object-cover" muted playsInline />
                    ) : (
                      <div className="h-full w-full grid place-items-center bg-tint-sun">
                        <span className="display text-3xl font-medium text-foreground/40">{p.category[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="eyebrow">{p.category}</p>
                    <h3 className="display text-lg font-medium mt-2 leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm text-foreground/70 line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 md:hidden">
            <Link to="/works" className="inline-flex items-center gap-2 text-sm font-medium">
              All {projects.length} projects <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-edge py-20 md:py-28">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-16 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-sun">Join the movement</p>
            <h2 className="mt-4 display text-3xl md:text-5xl font-semibold text-balance">
              The work is not finished. Lend your hand.
            </h2>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-sun text-foreground px-6 py-3 text-sm font-medium hover:bg-background transition">
              Volunteer <ArrowUpRight size={16} />
            </Link>
            <Link to="/manifesto" className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-medium hover:bg-background/10 transition">
              Read manifesto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
