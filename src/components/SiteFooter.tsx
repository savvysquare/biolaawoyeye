import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-dashed border-border bg-ink text-cream">
      <div className="container-edge grid md:grid-cols-12">
        <div className="md:col-span-6 py-20 md:pr-12 md:border-r border-dashed border-border">
          <p className="eyebrow text-sun mb-6">Accord · Ife Central</p>
          <h3 className="display text-4xl md:text-5xl font-black uppercase leading-none">
            Service is the rent we pay for living.
          </h3>
          <p className="mt-8 text-lg text-cream/70 max-w-sm font-medium">
            Hon. Engr. Abiola Jeremiah Awoyeye — Member, Osun State House of
            Assembly.
          </p>
        </div>

        <div className="md:col-span-3 py-20 md:pl-12 md:border-r border-dashed border-border">
          <p className="eyebrow text-cream/40 mb-8 uppercase">Navigate</p>
          <ul className="space-y-4 text-sm font-bold uppercase">
            <li><Link to="/about" className="hover:text-sun transition-colors">About</Link></li>
            <li><Link to="/works" className="hover:text-sun transition-colors">Works</Link></li>
            <li><Link to="/manifesto" className="hover:text-sun transition-colors">Manifesto</Link></li>
            <li><Link to="/contact" className="hover:text-sun transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3 py-20 md:pl-12">
          <p className="eyebrow text-cream/40 mb-8 uppercase">Office</p>
          <ul className="space-y-4 text-sm font-medium text-cream/80 leading-relaxed">
            <li>OSUN STATE HOUSE OF ASSEMBLY</li>
            <li>IFE CENTRAL CONSTITUENCY</li>
            <li>OSUN STATE, NIGERIA</li>
            <li className="pt-4"><Link to="/login" className="text-cream/40 hover:text-sun transition-colors">STAFF SIGN-IN</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-dashed border-cream/10">
        <div className="container-edge py-10 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-cream/40">
          <p>© {new Date().getFullYear()} HON. ABIOLA JEREMIAH AWOYEYE. ALL RIGHTS RESERVED.</p>
          <p className="mt-4 md:mt-0">POWER TO THE PEOPLE.</p>
        </div>
      </div>
    </footer>
  );
}
