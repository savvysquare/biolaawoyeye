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
    <div>
      <section className="container-edge pt-12 md:pt-20 pb-10">
        <p className="eyebrow">The Works · {projects.length} projects</p>
        <h1 className="mt-5 display text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.05] text-balance max-w-4xl">
          Every receipt, on one page.
        </h1>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/70">
          Every entry below is a finished or facilitated project across Ife Central since June 2023.
          Filter by manifesto category to explore.
        </p>
      </section>

      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur border-y border-dashed border-border">
        <div className="container-edge flex gap-2 overflow-x-auto py-3 -mx-1 px-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition border ${
                active === c
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="container-edge py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, idx) => {
            const media = (p.media as Media[]) ?? [];
            return (
              <article
                key={p.id}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground/40 transition"
              >
                <div className="aspect-[16/10] bg-muted overflow-hidden relative">
                  {media[0]?.type === "image" ? (
                    <img src={media[0].url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition" />
                  ) : media[0]?.type === "video" ? (
                    <video src={media[0].url} className="h-full w-full object-cover" controls preload="metadata" />
                  ) : (
                    <div className="h-full w-full grid place-items-center bg-tint-sun">
                      <span className="display text-4xl font-medium text-foreground/40">{p.category[0]}</span>
                    </div>
                  )}
                  {media.length > 1 && (
                    <span className="absolute bottom-2 right-2 rounded-full bg-background/90 backdrop-blur px-2.5 py-1 text-[11px]">
                      +{media.length - 1} more
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="eyebrow">{p.category}</p>
                    <span className="text-[11px] text-muted-foreground font-mono">№{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="display text-lg font-medium mt-2 leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{p.description}</p>
                  {p.location && (
                    <p className="mt-4 pt-4 border-t border-dashed border-border text-xs text-muted-foreground">
                      {p.location}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-20 text-muted-foreground">No projects yet in this category.</p>
        )}
      </section>
    </div>
  );
}
