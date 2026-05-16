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
    <div>
      <section className="container-edge pt-16 md:pt-24 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow text-primary">About the Honourable</p>
            <h1 className="mt-6 display text-[clamp(2.5rem,6vw,5.5rem)] text-balance">
              A young engineer rebuilding Ife Central, one ward at a time.
            </h1>
            <p className="mt-8 text-lg text-foreground/75 leading-relaxed max-w-2xl">
              {c.about_body}
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <Block title="Mandate" body="Member, Osun State House of Assembly representing Ife Central Constituency (Iremo, Ilare, Moore)." />
              <Block title="Sworn in" body="6 June 2023, following a decisive victory at the 2023 general elections." />
              <Block title="Profession" body="Engineer by training — bringing problem-solving and discipline into governance." />
              <Block title="Party" body="Now contesting under the Accord Party. Formerly PDP." />
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img src={portrait} alt="Portrait" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="mt-4 eyebrow text-muted-foreground">Power to the People</p>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream py-24">
        <div className="container-edge">
          <p className="eyebrow text-primary">Timeline</p>
          <h2 className="mt-3 display text-4xl md:text-5xl">From mandate to milestones.</h2>
          <div className="mt-16 grid gap-px bg-cream/10 rounded-2xl overflow-hidden">
            {timeline.map(([year, label, body]) => (
              <div key={year + label} className="bg-ink grid md:grid-cols-12 gap-6 p-8">
                <div className="md:col-span-2">
                  <p className="display text-3xl text-primary">{year}</p>
                  <p className="eyebrow text-cream/60 mt-1">{label}</p>
                </div>
                <p className="md:col-span-10 text-cream/85 leading-relaxed">{body}</p>
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
    <div className="rounded-xl border border-border p-6">
      <p className="eyebrow text-primary">{title}</p>
      <p className="mt-2 text-sm text-foreground/80">{body}</p>
    </div>
  );
}
