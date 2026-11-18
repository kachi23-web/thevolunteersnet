import Image from 'next/image';
import type { StatItem } from '@/types';
import { ButtonLink, SectionHeading } from '@/components/ui';

interface ImpactSectionProps {
  stats: StatItem[];
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  return (
    <section id="impact" className="relative isolate overflow-hidden bg-brand-navy py-20 text-white lg:py-28">
      {/* Photo backdrop, tinted navy so text and stats stay readable */}
      <Image
        src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=75&w=2000&auto=format&fit=crop"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            dark
            eyebrow="Our impact"
            title="The right volunteer in the right place goes a long way"
            description="We match people to the work they are actually equipped for, then measure what comes of it. These are the numbers so far."
          />
          <div>
            <ButtonLink href="/about" tone="ghostLight">
              Read our story
            </ButtonLink>
          </div>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/15 backdrop-blur-md sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse bg-brand-navy/70 p-8 lg:p-10">
              <dt className="mt-3 text-sm font-medium text-slate-300">{stat.label}</dt>
              <dd className="text-5xl font-black tracking-tight text-brand-orange lg:text-6xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
