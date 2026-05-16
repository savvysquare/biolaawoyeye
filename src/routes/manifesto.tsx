import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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

import { mapToPillar } from "@/lib/pillars";

function Manifesto() {
  const { data: rawItems = [] } = useQuery({
    queryKey: ["manifesto"],
    queryFn: async () => {
      const { data } = await supabase.from("manifesto_items").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const items = useMemo(() => {
    return rawItems.map(it => ({
      ...it,
      category: mapToPillar(it.category)
    }));
  }, [rawItems]);

  const current = items.filter((i) => i.term === "current");
  const previous = items.filter((i) => i.term === "previous");

  return (
    <div className="bg-background selection:bg-sun selection:text-ink">
      {/* Hero — Manifesto */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container-edge text-center flex flex-col items-center">
          <div className="eyebrow mb-8">Legislative Agenda</div>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1] max-w-5xl mb-10">
            Promises kept. Promises ahead.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            What was promised in 2023 — and what is being promised for the next term on the Accord Party platform. 
            A blueprint for the total restoration of Ife Central.
          </p>
        </div>
      </section>

      <Section title="Current Manifesto" eyebrow="2027 · Accord Party" items={current} accent />
      <Section title="Previous Manifesto" eyebrow="2023 · Previous Term" items={previous} />

      {/* Pillar shift narrative — Clean Split */}
      <section className="py-24 border-t border-border bg-cream/30">
        <div className="container-edge grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-6">The strategy</div>
            <h2 className="display text-4xl md:text-5xl font-bold mb-8">
              Same compass. Sharper map.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-8 text-lg text-muted-foreground leading-relaxed font-medium">
            <p>
              The original 2023 manifesto stood on five pillars: Education, Healthcare, Social & Welfare Infrastructure, Security, and Small & Medium Scale Business Support.
            </p>
            <p>
              Two years in office have validated this compass. Every project delivered—from solar boreholes to surgical outreatches—has been a direct fulfillment of these five promises.
            </p>
            <p>
              The current manifesto for the next term remains anchored in these same five pillars, ensuring a consistency of vision and a deepened focus on the restoration of Ife Central.
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
    <section className={`py-24 border-t border-border ${accent ? "bg-cream/20" : ""}`}>
      <div className="container-edge">
        <div className="mb-16">
           <div className={`eyebrow ${accent ? "text-grass" : ""} mb-6`}>{eyebrow}</div>
           <h2 className="display text-4xl md:text-6xl font-bold">{title}</h2>
        </div>
        
        <div className="grid gap-6">
          {items.map((it, i) => (
            <div
              key={it.id}
              className="bg-background rounded-[2.5rem] p-10 md:p-12 border border-border hover:shadow-xl transition-all duration-500 group"
            >
              <div className="grid md:grid-cols-12 gap-10 items-start">
                <div className="md:col-span-1">
                  <p className="display text-4xl font-bold text-grass/20 group-hover:text-grass transition-colors">{String(i + 1).padStart(2, "0")}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-[11px] font-bold text-grass uppercase tracking-widest mb-3">{it.category}</p>
                  <h3 className="display text-2xl font-bold leading-tight">{it.title}</h3>
                </div>
                <div className="md:col-span-7 flex items-start gap-6">
                  <ArrowRight size={24} className="text-grass/20 group-hover:text-grass transition-colors shrink-0 mt-1" />
                  <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                    {it.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="p-20 text-center text-muted-foreground/30 font-bold uppercase tracking-widest">
              No items yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
