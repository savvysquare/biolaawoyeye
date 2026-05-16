import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-cream">
      <div className="container-edge py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <p className="eyebrow text-primary">Accord · Ife Central</p>
          <h3 className="display text-3xl md:text-4xl mt-3">
            Service is the rent we pay for living.
          </h3>
          <p className="mt-4 text-sm text-cream/70">
            Hon. Engr. Abiola Jeremiah Awoyeye — Member, Osun State House of
            Assembly, Ife Central Constituency.
          </p>
        </div>

        <div>
          <p className="eyebrow text-cream/60">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/works" className="hover:text-primary">Works</Link></li>
            <li><Link to="/manifesto" className="hover:text-primary">Manifesto</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-cream/60">Office</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li>Osun State House of Assembly</li>
            <li>Ife Central Constituency</li>
            <li>Osun State, Nigeria</li>
            <li className="pt-2"><Link to="/login" className="text-cream/60 hover:text-primary">Staff sign-in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-edge py-6 flex flex-col md:flex-row items-center justify-between text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Hon. Abiola Jeremiah Awoyeye. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Power to the people.</p>
        </div>
      </div>
    </footer>
  );
}
