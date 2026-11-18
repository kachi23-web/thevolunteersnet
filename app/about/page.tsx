import Image from 'next/image';
import type { Metadata } from 'next';
import { Eye, Target } from 'lucide-react';
import { getAboutContent } from '@/lib/content';
import { ButtonLink, CtaBand, Eyebrow, SectionHeading } from '@/components/ui';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `About Us | ${site.name}`,
  description: `Learn about ${site.name} — our mission, our values, and how we work.`,
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      {/* Hero */}
      <section className="page-hero-bg border-b border-slate-200/70">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <Eyebrow>{content.hero.badge}</Eyebrow>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {content.hero.headingLine1}
              <span className="block text-brand-blue">{content.hero.headingHighlight}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              {content.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/volunteer">Become a volunteer</ButtonLink>
              <ButtonLink href="/contact" tone="outline">
                Get in touch
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-[32px] bg-brand-orange/20 sm:block"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-slate-200 lg:aspect-[5/4]">
              <Image
                src={content.hero.heroImage}
                alt={`${site.name} volunteers at a community event`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                preload
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-brand-blue/15 bg-brand-blue/5 p-8 sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue text-white">
              <Target className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-900">Our mission</h2>
            <p className="mt-3 text-lg leading-8 text-slate-700">{content.mission}</p>
          </div>
          <div className="rounded-3xl border border-brand-orange/20 bg-brand-orange/8 p-8 sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange text-brand-navy">
              <Eye className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-900">Our vision</h2>
            <p className="mt-3 text-lg leading-8 text-slate-700">{content.vision}</p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-brand-navy py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Our approach"
            title={content.approach.description}
            description="Every placement runs on the same foundations, so organizations know what to expect and volunteers know what is expected of them."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {content.approach.items.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <span aria-hidden="true" className="block text-3xl">
                  {item.icon}
                </span>
                <p className="mt-4 font-semibold leading-6 text-white">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our values"
            title="What we stand for"
            description="The principles we hold ourselves to — in the field, with partners and with each other."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.values.map((value, i) => (
              <li
                key={value.title}
                className="rounded-3xl border border-slate-200 bg-white p-8"
              >
                <span aria-hidden="true" className="text-sm font-black tabular-nums text-brand-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{value.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-slate-600">{value.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="There is a place for you here"
        description="Whether you have a skill to give or a programme that needs hands, we would love to hear from you."
        primary={{ label: 'Become a volunteer', href: '/volunteer' }}
        secondary={{ label: 'Partner with us', href: '/partner' }}
      />
    </>
  );
}
