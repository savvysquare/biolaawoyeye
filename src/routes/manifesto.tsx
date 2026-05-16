import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/manifesto")({
  head: () => ({
    meta: [
      { title: "Manifesto — Hon. Abiola Jeremiah Awoyeye" },
      { name: "description", content: "The current Accord Party manifesto and the previous PDP manifesto of Hon. Engr. Abiola Jeremiah Awoyeye for Ife Central." },
    ],
  }),
  component: Manifesto,
});

function Manifesto() {
  const { data: items = [] } = useQuery({
    queryKey: ["manifesto"],
    queryFn: async () => {
      const { data } = await supabase.from("manifesto_items").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const current = items.filter((i) => i.term === "current");
  const previous = items.filter((i) => i.term === "previous");

  return (
    <div className="bg-background selection:bg-sun selection:text-ink">
      {/* Editorial Header — Manifesto */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge py-16 md:py-24">
          <p className="eyebrow text-grass font-bold tracking-[0.25em] mb-8">THE MANIFESTO</p>
          <h1 className="display font-black text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] text-balance uppercase max-w-5xl">
            Promises kept. <span className="text-grass italic">Promises ahead.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-2xl text-foreground/70 leading-relaxed font-medium">
            What was promised in 2023 — and what is being promised for the next term on the Accord Party platform.
          </p>
        </div>
      </section>

      <Section title="Current Manifesto" eyebrow="2027 · ACCORD PARTY" items={current} accent />
      <Section title="Previous Manifesto" eyebrow="2023 · PREVIOUS TERM" items={previous} />

      {/* Pillar shift narrative — Crescent Two-Column Split */}
      <section className="border-y border-dashed border-border bg-tint-sun/5">
        <div className="container-edge grid lg:grid-cols-12">
          <div className="lg:col-span-4 py-20 md:py-28 lg:pr-12 border-r border-dashed border-border">
            <p className="eyebrow mb-6 text-grass">The Shift</p>
            <h2 className="display text-4xl md:text-6xl font-black uppercase leading-none">
              Same compass. Sharper map.
            </h2>
          </div>
          <div className="lg:col-span-8 py-20 md:py-28 lg:pl-16 space-y-8 text-lg text-foreground/70 leading-relaxed font-medium">
            <p>
              The original 2023 manifesto stood on five pillars: <strong>Education, Healthcare, Social & Welfare Infrastructure, Security,</strong> and <strong>Small & Medium Scale Business Support</strong>. Two years in office have shown which of these doors the people of Ife Central knock on hardest.
            </p>
            <p>
              Out of the SME and Welfare pillars, a sixth priority has emerged organically: <strong>Youth, Sports & Special Needs</strong> — a portfolio Hon. Awoyeye now chairs at the State Assembly. What began as empowerment grants has become tournaments, athlete stipends and inclusion programmes.
            </p>
            <p>
              The next term keeps the original five pillars intact and adds this lived-experience sixth, so that the manifesto continues to be written by the constituency.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  items,
  accent,
}: {
  title: string;
  eyebrow: string;
  items: Array<{ id: string; title: string; description: string; category: string }>;
  accent?: boolean;
}) {
  return (
    <section className={`border-b border-dashed border-border ${accent ? "bg-ink text-cream" : ""}`}>
      <div className="container-edge">
        <div className="py-20 md:py-28">
           <p className={`eyebrow ${accent ? "text-sun" : "text-grass"} mb-6 font-black tracking-widest uppercase`}>{eyebrow}</p>
           <h2 className="display text-5xl md:text-7xl font-black uppercase leading-none">{title}</h2>
        </div>
        
        <div className={`grid gap-px ${accent ? "bg-cream/10" : "bg-border"} border-x border-t border-dashed ${accent ? "border-cream/10" : "border-border"}`}>
          {items.map((it, i) => (
            <div
              key={it.id}
              className={`${accent ? "bg-ink" : "bg-background"} grid md:grid-cols-12 gap-10 p-10 md:p-16 hover:bg-tint-sun/5 transition-colors`}
            >
              <div className="md:col-span-1">
                <p className={`display text-5xl font-black ${accent ? "text-sun" : "text-grass"} opacity-40`}>{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className="md:col-span-4">
                <p className={`eyebrow ${accent ? "text-sun" : "text-grass"} mb-4 text-[10px] font-black uppercase tracking-widest`}>{it.category}</p>
                <h3 className="display text-2xl font-bold uppercase leading-tight">{it.title}</h3>
              </div>
              <div className="md:col-span-7 flex items-start gap-6">
                <ArrowRight size={24} className={`${accent ? "text-sun" : "text-grass"} shrink-0 mt-1`} />
                <p className={`text-xl ${accent ? "text-cream/70" : "text-foreground/70"} leading-relaxed font-medium`}>
                  {it.description}
                </p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className={`p-20 text-center uppercase tracking-widest font-black ${accent ? "text-cream/20" : "text-foreground/10"}`}>
              No items yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
