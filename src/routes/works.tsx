import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Works & Projects — Hon. Abiola Jeremiah Awoyeye" },
      { name: "description", content: "Every completed project delivered by Hon. Engr. Abiola Jeremiah Awoyeye for Ife Central since June 2023." },
    ],
  }),
  component: Works,
});

function Works() {
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await supabase.from("projects").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <section className="container-edge pt-16 md:pt-24 pb-12">
        <p className="eyebrow text-primary">The Works</p>
        <h1 className="mt-6 display text-[clamp(2.5rem,6vw,5.5rem)] text-balance max-w-4xl">
          {projects.length} completed projects — and counting.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/75">
          Every line below is a finished or facilitated project across Ife Central since June 2023.
          Filter by sector to explore the receipts.
        </p>
      </section>

      <section className="container-edge sticky top-16 z-30 bg-background/85 backdrop-blur border-y border-border">
        <div className="flex gap-2 overflow-x-auto py-4 -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition border ${
                active === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-edge py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, idx) => (
            <article
              key={p.id}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary hover:-translate-y-0.5 transition"
            >
              <div className="flex items-start justify-between">
                <p className="eyebrow text-primary">{p.category}</p>
                <span className="text-xs text-muted-foreground">
                  №{String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="display text-xl mt-3 leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{p.description}</p>
              {p.location && (
                <p className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                  {p.location}
                </p>
              )}
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-20 text-muted-foreground">No projects yet in this category.</p>
        )}
      </section>
    </div>
  );
}
