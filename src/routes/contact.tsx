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
    <div>
      <section className="container-edge pt-16 md:pt-24 pb-16">
        <p className="eyebrow text-primary">Contact</p>
        <h1 className="mt-6 display text-[clamp(2.5rem,6vw,5.5rem)] text-balance max-w-3xl">
          Talk to the office. Or join the movement.
        </h1>
      </section>

      <section className="container-edge pb-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <Info icon={<MapPin size={18} />} title="Constituency Office" body="Ife Central · Osun State, Nigeria" />
          <Info icon={<Mail size={18} />} title="Email" body="office@awoyeye.ng" />
          <Info icon={<Phone size={18} />} title="Phone" body="Available on request" />

          <div className="rounded-2xl bg-ink text-cream p-8 mt-10">
            <p className="eyebrow text-primary">Volunteer</p>
            <h3 className="display text-2xl mt-2">Power to the People is a team sport.</h3>
            <p className="mt-3 text-sm text-cream/70">
              Wards, polling units, mobilisation, comms, data — there is a role for every willing hand.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent. The office will be in touch.");
            setSent(true);
            (e.target as HTMLFormElement).reset();
          }}
          className="lg:col-span-7 rounded-2xl border border-border bg-card p-8 md:p-10 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Full name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Phone (optional)" name="phone" />
          <div>
            <label className="eyebrow text-foreground/70">Reason</label>
            <select name="reason" className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm">
              <option>General enquiry</option>
              <option>Volunteer</option>
              <option>Press</option>
              <option>Constituency matter</option>
            </select>
          </div>
          <div>
            <label className="eyebrow text-foreground/70">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-ember transition"
          >
            {sent ? "Sent — send another" : "Send message"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Info({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary shrink-0">{icon}</span>
      <div>
        <p className="eyebrow text-foreground/70">{title}</p>
        <p className="mt-1 text-base">{body}</p>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="eyebrow text-foreground/70">{label}</label>
      <input
        {...rest}
        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
