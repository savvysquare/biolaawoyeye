import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/hero-portrait.jpg";
import ife from "@/assets/ife-landscape.jpg";
import waterImg from "@/assets/work-water.jpg";
import eduImg from "@/assets/work-education.jpg";
import elecImg from "@/assets/work-electricity.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hon. Abiola Jeremiah Awoyeye — Power to the People" },
      { name: "description", content: "Member, Osun State House of Assembly, Ife Central Constituency. 35 completed projects in the first term. Now on the Accord Party platform." },
    ],
  }),
  component: Home,
});

function useContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      const map: Record<string, string> = {};
      (data ?? []).forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });
}

function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order");
      return data ?? [];
    },
  });
}

function Home() {
  const { data: c = {} } = useContent();
  const { data: projects = [] } = useProjects();

  const featured = projects.slice(0, 6);
  const categories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <div>
      {/* HERO */}
      <section className="container-edge pt-12 md:pt-20 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-primary">{c.hero_eyebrow ?? "Accord Party · Ife Central"}</p>
            <h1 className="mt-6 display text-[clamp(2.75rem,7vw,6.5rem)] text-balance">
              {c.hero_title ?? "Power restored to the people."}
            </h1>
            <p className="mt-8 max-w-xl text-lg text-foreground/75 leading-relaxed">
              {c.hero_subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/works"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-ember transition"
              >
                See the works
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/manifesto"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:border-primary hover:text-primary transition"
              >
                Read the manifesto
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-accent">
              <img
                src={portrait}
                alt="Hon. Engr. Abiola Jeremiah Awoyeye"
                className="h-full w-full object-cover"
                width={1024}
                height={1280}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 backdrop-blur p-4">
                <p className="eyebrow text-primary">Hon. Engr.</p>
                <p className="display text-xl mt-1">Abiola Jeremiah Awoyeye</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Member · Osun State House of Assembly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            ["Completed projects", c.stat_projects ?? "35"],
            ["Wards reached", c.stat_wards ?? "11"],
            ["Years in office", c.stat_years ?? "2"],
            ["Communities served", c.stat_communities ?? "20+"],
          ].map(([label, value]) => (
            <div key={label} className="bg-background p-6 md:p-8">
              <p className="display text-4xl md:text-5xl text-primary">{value}</p>
              <p className="mt-2 text-xs eyebrow text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-ink text-cream py-24 md:py-32">
        <div className="container-edge">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">The mandate</p>
            <h2 className="mt-4 display text-4xl md:text-6xl text-balance">
              Four pillars. One constituency. Measurable results.
            </h2>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-px bg-cream/10">
            {[
              { img: waterImg, k: "Water & Sanitation", v: "Solar boreholes restoring water access to communities dry for 20+ years." },
              { img: eduImg, k: "Education", v: "Classrooms rebuilt. Scholarships awarded. 1,500+ women trained." },
              { img: elecImg, k: "Electricity", v: "Transformers donated and installed across Modomo, Sabo and beyond." },
              { img: ife, k: "Welfare & Security", v: "OSHI enrolment, monthly stipends, legal aid and food palliatives." },
            ].map((p) => (
              <div key={p.k} className="bg-ink p-8 md:p-12">
                <div className="aspect-[16/10] overflow-hidden rounded-lg bg-cream/5">
                  <img src={p.img} alt={p.k} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <h3 className="display text-2xl mt-6">{p.k}</h3>
                <p className="mt-2 text-sm text-cream/70 max-w-md">{p.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORKS */}
      <section className="container-edge py-24 md:py-32">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow text-primary">Recent works</p>
            <h2 className="mt-3 display text-4xl md:text-5xl">From manifesto to concrete.</h2>
          </div>
          <Link to="/works" className="hidden md:inline-flex items-center gap-2 text-sm hover:text-primary">
            All {projects.length} projects <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <article key={p.id} className="group rounded-xl border border-border bg-card p-6 hover:border-primary transition">
              <p className="eyebrow text-primary">{p.category}</p>
              <h3 className="display text-xl mt-3 leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
              {p.location && <p className="mt-4 text-xs text-foreground/50">{p.location}</p>}
            </article>
          ))}
        </div>
        <div className="mt-10 md:hidden">
          <Link to="/works" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
            All {projects.length} projects <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      {categories.length > 0 && (
        <section className="border-y border-border bg-secondary/40">
          <div className="container-edge py-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="eyebrow text-muted-foreground">Areas of impact</p>
            {categories.map((c) => (
              <span key={c} className="text-sm">{c}</span>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-edge py-24 md:py-32">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-20 grid md:grid-cols-3 gap-10 items-end">
          <div className="md:col-span-2">
            <p className="eyebrow">Join the movement</p>
            <h2 className="mt-4 display text-4xl md:text-6xl text-balance">
              The work is not finished. Lend your hand.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 text-sm font-medium hover:bg-ember transition">
              Volunteer <ArrowUpRight size={16} />
            </Link>
            <Link to="/manifesto" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition">
              Read manifesto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
