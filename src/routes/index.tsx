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
      {/* HERO — Crescent editorial */}
      <section className="container-edge pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 pt-6">
            <p className="eyebrow">{c.hero_eyebrow ?? "Constituency Report · Ife Central"}</p>
            <h1 className="mt-6 display font-semibold text-[clamp(2.5rem,6.2vw,5.5rem)] leading-[1.02] text-balance">
              {c.hero_title ?? "How Ife Central went from neglect to 35+ completed projects in 24 months."}
            </h1>
            <p className="mt-7 max-w-xl text-base md:text-lg text-foreground/70 leading-relaxed">
              {c.hero_subtitle ?? "Hon. Engr. Abiola Jeremiah Awoyeye has spent his first term turning the manifesto into water, roads, scholarships and stipends. The work continues on the Accord Party platform."}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/works"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-grass transition"
              >
                See the works
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/manifesto"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:border-foreground transition"
              >
                Read the manifesto
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-tint-grass">
              <img src={portrait} alt="Hon. Engr. Abiola Jeremiah Awoyeye" className="h-full w-full object-cover" width={1024} height={1280} />
            </div>
          </div>
        </div>

        {/* Stat tiles — pastel yellow + green à la Crescent */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: c.stat_projects ?? "35+", l: "completed projects", tone: "bg-tint-sun" },
            { v: c.stat_wards ?? "11", l: "wards reached", tone: "bg-tint-grass" },
            { v: c.stat_years ?? "2", l: "years in office", tone: "bg-tint-sun" },
            { v: c.stat_communities ?? "20+", l: "communities served", tone: "bg-tint-grass" },
          ].map((s) => (
            <div key={s.l} className={`${s.tone} rounded-2xl p-6 md:p-7`}>
              <p className="display text-5xl md:text-6xl font-medium tracking-tight text-foreground">{s.v}</p>
              <p className="mt-6 text-sm text-foreground/70">{s.l}</p>
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

      {/* PILLARS — clean grid */}
      <section className="container-edge py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-5">
            <p className="eyebrow">The mandate</p>
            <h2 className="mt-4 display text-4xl md:text-5xl font-semibold text-balance">
              Four pillars. One constituency. Measurable results.
            </h2>
          </div>
          <p className="md:col-span-7 md:pt-10 text-foreground/70 max-w-xl">
            Every project below is recorded, dated and tied to a manifesto promise. No press-release politics.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { img: waterImg, k: "Water & Sanitation", v: "Solar boreholes restoring water to communities dry for 20+ years." },
            { img: eduImg, k: "Education", v: "Classrooms rebuilt, scholarships awarded, 1,500+ women trained." },
            { img: elecImg, k: "Electricity", v: "Transformers donated and installed across Modomo, Sabo and beyond." },
            { img: ife, k: "Welfare & Security", v: "OSHI enrolment, monthly stipends, legal aid and palliatives." },
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
