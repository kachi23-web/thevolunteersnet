import Link from 'next/link';
import { ArrowRight, Building2, HandHeart } from 'lucide-react';

const paths = [
  {
    href: '/volunteer',
    icon: HandHeart,
    label: 'For individuals',
    title: 'I want to volunteer',
    body: 'Tell us what you are good at and what you care about. We will match you with an organization that needs exactly that.',
    cta: 'Apply to volunteer',
    accent: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    href: '/partner',
    icon: Building2,
    label: 'For organizations',
    title: 'We need volunteers',
    body: 'Tell us about your programme. We recruit, train and manage the volunteers so your team can stay focused on the mission.',
    cta: 'Request volunteers',
    accent: 'bg-brand-orange/15 text-[#B45309]',
  },
];

/**
 * Sits directly under the hero and routes the two audiences — volunteers
 * and organizations — to the right form in one click.
 */
export default function AudienceSplit() {
  return (
    <section aria-label="Get involved" className="relative z-30 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 pt-12 md:grid-cols-2 lg:pt-16">
          {paths.map(({ href, icon: Icon, label, title, body, cta, accent }) => (
            <Link
              key={href}
              href={href}
              className="group flex gap-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_12px_40px_-16px_rgba(13,27,62,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:p-8"
            >
              <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${accent}`}>
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="block">
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                </span>
                <span className="mt-1.5 block text-xl font-bold tracking-tight text-slate-900">
                  {title}
                </span>
                <span className="mt-2 block text-sm leading-7 text-slate-600">{body}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                  {cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
