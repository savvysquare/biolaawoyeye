import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hon. Abiola Jeremiah Awoyeye" },
      { name: "description", content: "Reach the constituency office of Hon. Engr. Abiola Jeremiah Awoyeye, or volunteer for the Accord campaign." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-background selection:bg-sun selection:text-ink">
      {/* Editorial Header — Contact */}
      <section className="border-b border-dashed border-border">
        <div className="container-edge py-16 md:py-24">
          <p className="eyebrow text-grass font-bold tracking-[0.25em] mb-8">CONTACT THE OFFICE</p>
          <h1 className="display font-black text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] text-balance uppercase max-w-4xl">
            Talk to the office. <span className="text-grass italic">Join the movement.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg md:text-2xl text-foreground/70 leading-relaxed font-medium">
            Wards, polling units, mobilisation, comms, data — there is a role for every willing hand. Reach out today.
          </p>
        </div>
      </section>

      <section className="border-b border-dashed border-border">
        <div className="container-edge grid lg:grid-cols-12">
          {/* Info Column */}
          <div className="lg:col-span-4 py-20 md:py-28 lg:pr-12 md:border-r border-dashed border-border space-y-12">
            <Info icon={<MapPin size={24} />} title="Constituency Office" body="Ife Central · Osun State, Nigeria" />
            <Info icon={<Mail size={24} />} title="Email" body="office@awoyeye.ng" />
            <Info icon={<Phone size={24} />} title="Phone" body="Available on request" />

            <div className="bg-ink p-10 rounded-3xl text-cream">
              <p className="eyebrow text-sun mb-6 uppercase tracking-widest">Volunteer</p>
              <h3 className="display text-3xl font-black uppercase leading-tight">Power to the People is a team sport.</h3>
              <p className="mt-6 text-cream/60 leading-relaxed font-medium">
                Every ward and polling unit needs a voice. Join the campaign and help shape the future.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8 py-20 md:py-28 lg:pl-16">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent. The office will be in touch.");
                setSent(true);
                (e.target as HTMLFormElement).reset();
              }}
              className="grid gap-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Full name" name="name" required />
                <Field label="Email address" name="email" type="email" required />
              </div>
              <Field label="Phone number (optional)" name="phone" />
              <div>
                <label className="eyebrow text-foreground/40 mb-4 block uppercase tracking-widest">Reason for enquiry</label>
                <select name="reason" className="w-full bg-background border-2 border-border p-5 text-lg font-bold focus:border-grass focus:outline-none appearance-none cursor-pointer">
                  <option>General enquiry</option>
                  <option>Volunteer</option>
                  <option>Press</option>
                  <option>Constituency matter</option>
                </select>
              </div>
              <div>
                <label className="eyebrow text-foreground/40 mb-4 block uppercase tracking-widest">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-background border-2 border-border p-5 text-lg font-medium focus:border-grass focus:outline-none resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-grass px-12 py-5 text-xl font-bold text-white shadow-2xl shadow-grass/30 hover:scale-105 transition uppercase"
              >
                {sent ? "MESSAGE SENT" : "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function Info({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-6">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-tint-sun text-grass shrink-0">{icon}</span>
      <div>
        <p className="eyebrow text-foreground/40 mb-2 uppercase tracking-widest">{title}</p>
        <p className="text-xl font-black uppercase">{body}</p>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full">
      <label className="eyebrow text-foreground/40 mb-4 block uppercase tracking-widest">{label}</label>
      <input
        {...rest}
        className="w-full bg-background border-2 border-border p-5 text-lg font-bold focus:border-grass focus:outline-none"
      />
    </div>
  );
}
