import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/hero-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hon. Abiola Jeremiah Awoyeye" },
      { name: "description", content: "The story, the mandate and the values of Hon. Engr. Abiola Jeremiah Awoyeye, Member representing Ife Central at the Osun State House of Assembly." },
    ],
  }),
  component: About,
});

function About() {
  const { data: c = {} as Record<string, string> } = useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      const m: Record<string, string> = {};
      (data ?? []).forEach((r) => (m[r.key] = r.value));
      return m;
    },
  });

  const timeline = [
    ["2023", "June", "Sworn in as Member representing Ife Central at the Osun State House of Assembly."],
    ["2023", "First 100 days", "Solar boreholes commissioned at OAU Junior Staff Quarters; street lights at Abagbooro Elefon."],
    ["2024", "Year One", "Classrooms rebuilt at Oluorogbo High School and St. David's. Transformer installations across Modomo."],
    ["2025", "Year Two", "Legal Aid Programme launched. 1,500+ women trained. Wider OSHI enrolment for elderly and PWDs."],
    ["2026", "Ahead", "Now contesting on the platform of the Accord Party — to renew a mandate that is already working."],
  ];

  return (
    <div className="bg-background selection:bg-sun selection:text-ink">
      {/* Editorial Header — About */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge grid lg:grid-cols-12 min-h-[60vh]">
          <div className="lg:col-span-8 py-16 md:py-24 lg:pr-16 flex flex-col justify-center border-r border-dashed border-border">
            <p className="eyebrow text-grass font-bold tracking-[0.25em] mb-8">ABOUT THE HONOURABLE</p>
            <h1 className="display font-black text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] text-balance uppercase mb-10">
              Rebuilding Ife Central, ward by ward.
            </h1>
            <div className="max-w-2xl text-lg md:text-xl text-foreground/70 leading-relaxed font-medium">
              <p>{c.about_body}</p>
            </div>
          </div>
          <div className="lg:col-span-4 bg-tint-sun/30 flex items-center justify-center p-8 md:p-12">
             <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border">
               <img src={portrait} alt="Hon. Abiola Awoyeye" className="h-full w-full object-cover grayscale" />
             </div>
          </div>
        </div>
      </section>

      {/* Grid Content — Mandate Blocks */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border-x border-dashed border-border">
          <Block title="Mandate" body="Member, Osun State House of Assembly representing Ife Central Constituency (Iremo, Ilare, Moore)." />
          <Block title="Committee" body="Chairman, House Committee on Youth, Sports and Special Needs — Osun State House of Assembly." />
          <Block title="Sworn in" body="6 June 2023, following a decisive victory at the 2023 general elections." />
          <Block title="Profession" body="Engineer by training — bringing problem-solving and discipline into governance." />
          <Block title="Party" body="Now contesting under the Accord Party. Formerly PDP." />
          <Block title="Pillars" body="Education · Healthcare · Welfare Infrastructure · Security · SME Support." />
        </div>
      </section>

      {/* Timeline — Dark Editorial Style */}
      <section className="bg-ink text-cream border-t border-dashed border-border">
        <div className="container-edge py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
            <div className="lg:col-span-8">
              <p className="eyebrow text-sun mb-6 uppercase">Timeline</p>
              <h2 className="display text-5xl md:text-7xl font-black uppercase leading-none">From mandate to milestones.</h2>
            </div>
          </div>
          
          <div className="grid gap-px bg-cream/10 border border-cream/10">
            {timeline.map(([year, label, body]) => (
              <div key={year + label} className="bg-ink grid md:grid-cols-12 gap-8 p-10 md:p-14 hover:bg-cream/[0.02] transition-colors">
                <div className="md:col-span-3">
                  <p className="display text-5xl md:text-6xl font-black text-sun">{year}</p>
                  <p className="eyebrow text-cream/40 mt-4 uppercase tracking-widest">{label}</p>
                </div>
                <div className="md:col-span-9 flex items-center">
                  <p className="text-xl md:text-2xl text-cream/80 leading-relaxed font-medium">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-background p-10 hover:bg-tint-sun/10 transition-colors">
      <p className="eyebrow text-grass mb-6 uppercase font-bold tracking-widest">{title}</p>
      <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">{body}</p>
    </div>
  );
}
