import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/about-image.webp";

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
    ["2025", "Year Two", "Legal Aid Programme launched. 1,500+ women trained. Wider OHIS enrolment for elderly and PWDs."],
    ["2026", "Ahead", "Now contesting on the platform of the Accord Party — to renew a mandate that is already working."],
  ];

  return (
    <div className="bg-background selection:bg-sun selection:text-ink">
      {/* Refined Hero — About */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container-edge text-center flex flex-col items-center">
          <div className="eyebrow mb-8">Hon. Abiola Jeremiah Awoyeye</div>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1] max-w-5xl mb-10">
            A vision for a restored constituency.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Representing the people of Ife Central at the Osun State House of Assembly. 
            Chairman of the House Committee on Youth, Sports, and Special Needs.
          </p>
        </div>
      </section>

      {/* Narrative Section — Two column refined split */}
      <section className="py-24 border-t border-border">
        <div className="container-edge grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative">
             <div className="absolute -inset-4 bg-grass/5 blur-3xl rounded-full -z-10" />
             <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-border">
                <img src={portrait} alt="Portrait" className="h-full w-full object-cover transition-all duration-1000" />
             </div>
          </div>
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
              <p>
                Hon. Engr. Abiola Jeremiah Awoyeye is a dedicated public servant and legislative leader committed to the total transformation of Ife Central. With a background in engineering, he brings a problem-solving mindset to the state legislature.
              </p>
              <p>
                Since June 2023, he has prioritized infrastructure, social welfare, and youth empowerment, delivering 37 major projects across the constituency.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
               <div className="bg-cream p-8 rounded-[2rem] border border-border/50">
                  <p className="text-grass font-bold mb-3">Legislative Role</p>
                  <p className="text-sm font-medium text-muted-foreground">Member, Osun State House of Assembly representing Ife Central State Constituency.</p>
               </div>
               <div className="bg-cream p-8 rounded-[2rem] border border-border/50">
                  <p className="text-grass font-bold mb-3">Committee Leadership</p>
                  <p className="text-sm font-medium text-muted-foreground">Chairman, House Committee on Youth, Sports, and Special Needs.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandate Blocks — Refined Squircle Grid */}
      <section className="py-24 bg-cream/50 border-y border-border">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <div className="eyebrow mb-6">Legislative Mandate</div>
            <h2 className="display text-4xl md:text-5xl font-bold">The five pillars of progress.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Block title="Education" body="Facilitating school renovations, providing scholarships, and ensuring qualitative learning for every child." />
            <Block title="Healthcare" body="Rehabilitating primary health centers and facilitating outreach programs to improve constituency well-being." />
            <Block title="Infrastructure" body="Restoring water systems, facilitating road grading, and improving public facilities in all eleven wards." />
            <Block title="Security" body="Partnering with local agencies and facilitating equipment support to keep our communities safe." />
            <Block title="SME Support" body="Providing grants and vocational equipment to local artisans and small business owners to drive prosperity." />
            <div className="bg-grass text-white p-10 rounded-[2.5rem] flex flex-col justify-center">
               <p className="text-lg font-bold mb-4 italic">“We are writing a new story for Ife Central, one project at a time.”</p>
               <Link to="/contact" className="text-sm font-bold underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">Join the team</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — Clean Minimal List */}
      <section className="py-24">
        <div className="container-edge">
          <div className="max-w-2xl mb-16">
            <div className="eyebrow mb-6">Timeline</div>
            <h2 className="display text-4xl md:text-5xl font-bold">From mandate to milestones.</h2>
          </div>
          
          <div className="space-y-12">
            {timeline.map(([year, label, body]) => (
              <div key={year + label} className="grid md:grid-cols-12 gap-8 items-start group">
                <div className="md:col-span-3">
                  <p className="display text-4xl font-bold text-grass mb-2 group-hover:translate-x-2 transition-transform">{year}</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                </div>
                <div className="md:col-span-9 pt-2">
                  <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">{body}</p>
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
    <div className="bg-background p-10 rounded-[2.5rem] border border-border hover:shadow-xl transition-all duration-500">
      <div className="h-2 w-10 bg-grass/20 rounded-full mb-8" />
      <h3 className="display text-2xl font-bold mb-4">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">{body}</p>
    </div>
  );
}
