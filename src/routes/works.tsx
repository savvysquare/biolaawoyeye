import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Media } from "@/lib/media";

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
    [projects],
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-background selection:bg-sun selection:text-ink">
      {/* Hero — Works */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container-edge text-center flex flex-col items-center">
          <div className="eyebrow mb-8">Portfolio of Progress · {projects.length} Projects</div>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1] max-w-5xl mb-10">
            Every receipt, on one page.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every entry below is a finished or facilitated project across Ife Central since June 2023. 
            Filter by category to explore the impact.
          </p>
        </div>
      </section>

      {/* Filter — Clean Pill Nav */}
      <section className="sticky top-24 z-30 bg-background/80 backdrop-blur-xl border-y border-border/50">
        <div className="container-edge py-6 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap px-6 py-2.5 text-[13px] font-bold rounded-full transition-all ${
                active === c
                  ? "bg-grass text-white shadow-lg shadow-grass/20"
                  : "bg-cream text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-edge py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, idx) => {
            const media = (p.media as Media[]) ?? [];
            return (
              <article
                key={p.id}
                className="group bg-background rounded-[2.5rem] p-5 border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="aspect-[16/10] bg-muted overflow-hidden relative rounded-[1.5rem] mb-8">
                  {media[0]?.type === "image" ? (
                    <img src={media[0].url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                  ) : media[0]?.type === "video" ? (
                    <video src={media[0].url} className="h-full w-full object-cover" controls preload="metadata" />
                  ) : (
                    <div className="h-full w-full grid place-items-center bg-tint-grass">
                      <span className="display text-4xl font-bold text-grass/20">{p.category[0]}</span>
                    </div>
                  )}
                  {media.length > 1 && (
                    <span className="absolute bottom-4 right-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[11px] font-bold shadow-sm">
                      +{media.length - 1} more
                    </span>
                  )}
                </div>
                <div className="px-3 pb-3">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-[11px] font-bold text-grass uppercase tracking-wider">{p.category}</p>
                    <span className="text-[10px] text-muted-foreground font-bold italic">№{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="display text-xl font-bold mb-4 group-hover:text-grass transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground font-medium line-clamp-3 leading-relaxed mb-8">{p.description}</p>
                  {p.location && (
                    <div className="pt-6 border-t border-border">
                       <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Location</p>
                       <p className="text-sm font-bold text-foreground">{p.location}</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="display text-3xl font-bold text-muted-foreground/30">No projects in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
