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
      {/* Hero — Contact */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container-edge text-center flex flex-col items-center">
          <div className="eyebrow mb-8">Get in touch</div>
          <h1 className="display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1] max-w-5xl mb-10">
            Talk to the office. Join the movement.
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Wards, polling units, mobilisation, comms, data — there is a role for every willing hand. 
            Reach out today to become part of the progress.
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container-edge grid lg:grid-cols-12 gap-16">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <Info icon={<MapPin size={24} />} title="Constituency Office" body="Ife Central · Osun State, Nigeria" />
              <Info icon={<Mail size={24} />} title="Email address" body="office@awoyeye.ng" />
              <Info icon={<Phone size={24} />} title="Phone number" body="Available on request" />
            </div>

            <div className="bg-grass p-10 rounded-[3rem] text-white shadow-2xl shadow-grass/20">
              <div className="h-2 w-12 bg-white/20 rounded-full mb-8" />
              <h3 className="display text-3xl font-bold mb-6">Power to the people is a team sport.</h3>
              <p className="text-white/70 leading-relaxed font-medium">
                Every ward and polling unit needs a voice. Join the campaign and help shape the future of Ife Central.
              </p>
            </div>
          </div>

          {/* Form Column — Clean & Modern */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent. The office will be in touch.");
                setSent(true);
                (e.target as HTMLFormElement).reset();
              }}
              className="bg-cream p-10 md:p-14 rounded-[3rem] border border-border/50 grid gap-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Full name" name="name" placeholder="John Doe" required />
                <Field label="Email address" name="email" type="email" placeholder="john@example.com" required />
              </div>
              <Field label="Phone number (optional)" name="phone" placeholder="+234..." />
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 block">Reason for enquiry</label>
                <select name="reason" className="w-full bg-background border border-border rounded-2xl p-5 text-sm font-bold focus:border-grass focus:outline-none appearance-none cursor-pointer">
                  <option>General enquiry</option>
                  <option>Volunteer</option>
                  <option>Press</option>
                  <option>Constituency matter</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 block">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full bg-background border border-border rounded-2xl p-5 text-sm font-medium focus:border-grass focus:outline-none resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="pill-button bg-grass text-white py-5 text-lg hover:scale-105"
              >
                {sent ? "Message sent" : "Send message"}
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
    <div className="flex gap-6 items-center">
      <div className="h-14 w-14 rounded-2xl bg-cream border border-border/50 grid place-items-center text-grass shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
        <p className="text-lg font-bold">{body}</p>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full">
      <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 block">{label}</label>
      <input
        {...rest}
        className="w-full bg-background border border-border rounded-2xl p-5 text-sm font-bold focus:border-grass focus:outline-none"
      />
    </div>
  );
}
