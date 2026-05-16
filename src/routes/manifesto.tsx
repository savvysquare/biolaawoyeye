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
    <div>
      <section className="container-edge pt-16 md:pt-24 pb-16">
        <p className="eyebrow text-primary">The Manifesto</p>
        <h1 className="mt-6 display text-[clamp(2.5rem,6vw,5.5rem)] text-balance max-w-4xl">
          Promises kept. Promises ahead.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75">
          What was promised in 2023 — and what is being promised for the next term on the Accord Party platform.
        </p>
      </section>

      <Section title="Current Manifesto" eyebrow="2027 · Accord Party" items={current} accent />
      <Section title="Previous Manifesto" eyebrow="2023 · As contested under PDP" items={previous} />

      {/* Pillar shift narrative */}
      <section className="border-y border-dashed border-border bg-tint-sun">
        <div className="container-edge py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow">The shift</p>
            <h2 className="mt-3 display text-3xl md:text-5xl font-semibold text-balance">
              Same compass. Sharper map.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-5 text-foreground/80 leading-relaxed">
            <p>
              The original 2023 manifesto stood on five pillars: <strong>Education, Healthcare, Social & Welfare Infrastructure, Security,</strong> and <strong>Small & Medium Scale Business Support</strong>. Two years in office have shown which of these doors the people of Ife Central knock on hardest — and where the work has had to grow new branches.
            </p>
            <p>
              Out of the SME and Welfare pillars, a sixth priority has emerged organically: <strong>Youth, Sports & Special Needs</strong> — a portfolio Hon. Awoyeye now chairs at the State Assembly. What began as empowerment grants has become tournaments, athlete stipends and inclusion programmes for persons with disabilities.
            </p>
            <p>
              The next term keeps the original five pillars intact and adds this lived-experience sixth, so that the manifesto continues to be written by the constituency, not just for it.
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
    <section className={`py-20 ${accent ? "bg-ink text-cream" : ""}`}>
      <div className="container-edge">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <p className={`eyebrow ${accent ? "text-primary" : "text-primary"}`}>{eyebrow}</p>
            <h2 className="mt-3 display text-3xl md:text-5xl">{title}</h2>
          </div>
        </div>
        <div className={`grid gap-px ${accent ? "bg-cream/10" : "bg-border"} rounded-2xl overflow-hidden border ${accent ? "border-cream/10" : "border-border"}`}>
          {items.map((it, i) => (
            <div
              key={it.id}
              className={`${accent ? "bg-ink" : "bg-background"} grid md:grid-cols-12 gap-6 p-8 md:p-10`}
            >
              <div className="md:col-span-1">
                <p className="display text-3xl text-primary">{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className="md:col-span-3">
                <p className="eyebrow text-primary">{it.category}</p>
                <h3 className="display text-xl mt-2">{it.title}</h3>
              </div>
              <div className="md:col-span-8 flex items-start gap-4">
                <ArrowRight size={18} className="mt-1 text-primary shrink-0" />
                <p className={`${accent ? "text-cream/80" : "text-foreground/80"} leading-relaxed`}>
                  {it.description}
                </p>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className={`${accent ? "bg-ink text-cream/60" : "bg-background text-muted-foreground"} p-10 text-center`}>
              No items yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
