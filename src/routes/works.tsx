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
      {/* Editorial Header — Works */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge py-16 md:py-24">
          <p className="eyebrow text-grass font-bold tracking-[0.25em] mb-8">PORTFOLIO OF PROGRESS · {projects.length} PROJECTS</p>
          <h1 className="display font-black text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] text-balance uppercase max-w-5xl">
            Every receipt, <span className="text-grass italic">on one page.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-2xl text-foreground/70 leading-relaxed font-medium">
            Every entry below is a finished or facilitated project across Ife Central since June 2023.
            Explore the impact of targeted representation.
          </p>
        </div>
      </section>

      {/* Category Filter — Stick to Grid */}
      <section className="sticky top-20 z-30 bg-background/90 backdrop-blur border-b border-dashed border-border">
        <div className="container-edge flex items-center gap-4 overflow-x-auto py-5 no-scrollbar">
          <span className="text-[10px] font-black tracking-[0.2em] text-foreground/40 uppercase mr-4">Filter:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap px-6 py-2 text-xs font-black tracking-[0.15em] transition-all border-2 uppercase ${
                active === c
                  ? "bg-grass text-white border-grass"
                  : "border-border text-foreground/60 hover:border-foreground"
              } rounded-full`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-edge py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {filtered.map((p, idx) => {
            const media = (p.media as Media[]) ?? [];
            return (
              <article
                key={p.id}
                className="group bg-background p-8 hover:bg-tint-sun/10 transition-colors"
              >
                <div className="aspect-[16/10] bg-muted overflow-hidden relative rounded-xl mb-8 border border-border/50">
                  {media[0]?.type === "image" ? (
                    <img src={media[0].url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                  ) : media[0]?.type === "video" ? (
                    <video src={media[0].url} className="h-full w-full object-cover" controls preload="metadata" />
                  ) : (
                    <div className="h-full w-full grid place-items-center bg-tint-sun/50">
                      <span className="display text-4xl font-black text-grass/30 uppercase">{p.category[0]}</span>
                    </div>
                  )}
                  {media.length > 1 && (
                    <span className="absolute bottom-4 right-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                      +{media.length - 1} MORE
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <p className="eyebrow text-grass text-[10px] font-black tracking-[0.2em] uppercase">{p.category}</p>
                    <span className="text-[10px] text-foreground/30 font-black uppercase tracking-tighter italic">№{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="display text-2xl font-bold mb-4 group-hover:text-grass transition-colors uppercase leading-tight">{p.title}</h3>
                  <p className="text-sm text-foreground/60 line-clamp-4 leading-relaxed font-medium mb-6">{p.description}</p>
                  {p.location && (
                    <div className="pt-6 border-t border-dashed border-border">
                       <p className="text-[10px] font-black tracking-[0.1em] text-foreground/40 uppercase mb-1">Location</p>
                       <p className="text-sm font-bold uppercase">{p.location}</p>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="py-32 text-center border-x border-dashed border-border border-b">
            <p className="display text-3xl font-black text-foreground/20 uppercase tracking-widest">No projects in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
