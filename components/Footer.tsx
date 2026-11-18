import Link from 'next/link';
import Logo from '@/components/Logo';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/lib/site';

const exploreLinks = [
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'What we do' },
  { href: '/blog', label: 'Stories' },
  { href: '/contact', label: 'Contact' },
];

const involvedLinks = [
  { href: '/volunteer', label: 'Become a volunteer' },
  { href: '/partner', label: 'Partner with us' },
];

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  ),
  LinkedIn: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.059-1.864-3.059-1.865 0-2.151 1.457-2.151 2.962v5.701h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z" />
  ),
  Instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 4.943a4.894 4.894 0 100 9.788 4.894 4.894 0 000-9.788zm0 8.073a3.179 3.179 0 110-6.358 3.179 3.179 0 010 6.358zm6.406-8.845a1.144 1.144 0 100-2.288 1.144 1.144 0 000 2.288z" />
  ),
};

const linkClass =
  'text-sm text-slate-300 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="group inline-flex rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Logo tone="dark" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
              We recruit, train and manage volunteers for NGOs and community
              organizations — so good work gets the hands it needs.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {site.social.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-orange hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {socialIcons[label]}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Explore</h2>
            <ul className="mt-5 space-y-3.5">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <nav aria-label="Get involved">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Get involved</h2>
            <ul className="mt-5 space-y-3.5">
              {involvedLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Talk to us</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" aria-hidden="true" />
                <a href={site.phoneHref} className={linkClass}>
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-orange" aria-hidden="true" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <p>Built by volunteers, for communities.</p>
        </div>
      </div>
    </footer>
  );
}
