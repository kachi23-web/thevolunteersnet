import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Contact Us — ${site.name}`,
  description: `Get in touch with ${site.name}. Reach us by email or phone, or follow us on social media.`,
};

const channels = [
  {
    icon: Mail,
    label: 'Email us',
    value: site.email,
    href: `mailto:${site.email}`,
    note: 'For anything that needs a little detail.',
  },
  {
    icon: Phone,
    label: 'Call us',
    value: site.phoneDisplay,
    href: site.phoneHref,
    note: 'Speak to a member of the team directly.',
  },
  {
    icon: MapPin,
    label: 'Find us',
    value: site.location,
    href: undefined,
    note: 'Our teams are based in Lagos and Abuja.',
  },
];

const shortcuts = [
  {
    href: '/volunteer',
    title: 'Want to volunteer?',
    body: 'Skip the email — the volunteer form gets you to the right person faster.',
    cta: 'Apply to volunteer',
  },
  {
    href: '/partner',
    title: 'Need volunteers for your organization?',
    body: 'Tell us about your programme and we will come back with a plan.',
    cta: 'Request volunteers',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s"
        highlight="talk"
        description="Questions, ideas, or a programme that could use a few good people — we would love to hear about it."
      />

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Channels */}
          <ul className="grid gap-6 md:grid-cols-3">
            {channels.map(({ icon: Icon, label, value, href, note }) => (
              <li key={label} className="rounded-3xl border border-slate-200 bg-white p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/8 text-brand-blue">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                </h2>
                {href ? (
                  <a
                    href={href}
                    className="mt-2 block break-words text-lg font-bold text-slate-900 underline-offset-4 hover:text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
                )}
                <p className="mt-2 text-sm leading-6 text-slate-600">{note}</p>
              </li>
            ))}
          </ul>

          {/* Shortcuts */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {shortcuts.map(({ href, title, body, cta }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-3xl bg-slate-50 p-8 transition-colors duration-200 hover:bg-brand-blue/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{title}</h2>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                  {cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-slate-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-600">
              Follow the work as it happens.
            </p>
            <ul className="flex flex-wrap gap-3">
              {site.social.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:border-brand-blue hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
