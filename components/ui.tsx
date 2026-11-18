import Link from 'next/link';
import type { ReactNode } from 'react';

/* --------------------------------------------------------------------------
   Buttons — one shape (pill), four tones. Use `buttonClass` on <button>,
   or <ButtonLink> for navigation.
   -------------------------------------------------------------------------- */

type Tone = 'primary' | 'accent' | 'outline' | 'white' | 'ghostLight';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const tones: Record<Tone, string> = {
  primary:
    'bg-brand-blue text-white hover:bg-[#0D47A1] focus-visible:outline-brand-blue',
  accent:
    'bg-brand-orange text-brand-navy hover:bg-[#FF9100] focus-visible:outline-white',
  outline:
    'border border-brand-blue/40 text-brand-blue hover:bg-brand-blue/5 hover:border-brand-blue focus-visible:outline-brand-blue',
  white:
    'bg-white text-brand-blue hover:bg-blue-50 focus-visible:outline-white',
  ghostLight:
    'border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[15px]',
};

export function buttonClass(tone: Tone = 'primary', size: Size = 'lg', extra = '') {
  return [base, tones[tone], sizes[size], extra].filter(Boolean).join(' ');
}

export function ButtonLink({
  href,
  tone = 'primary',
  size = 'lg',
  className = '',
  children,
}: {
  href: string;
  tone?: Tone;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(tone, size, className)}>
      {children}
    </Link>
  );
}

/* --------------------------------------------------------------------------
   Eyebrow + section heading
   -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  tone = 'blue',
}: {
  children: ReactNode;
  tone?: 'blue' | 'orange';
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === 'orange' ? 'text-brand-orange' : 'text-brand-blue'
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
}) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <div className={centered ? 'flex justify-center' : ''}>
          <Eyebrow tone={dark ? 'orange' : 'blue'}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.1] tracking-tight ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-8 ${dark ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   PageHero — shared header for every inner page
   -------------------------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero-bg border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-slate-900">
            {title}
            {highlight && <span className="text-brand-blue"> {highlight}</span>}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   CtaBand — closing call to action, shared by every page
   -------------------------------------------------------------------------- */

export function CtaBand({
  heading,
  description,
  primary,
  secondary,
}: {
  heading: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-brand-blue px-8 py-14 sm:px-14 lg:px-20 lg:py-20 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-white/[0.07]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight">
                {heading}
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/85">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-col lg:items-stretch">
              <ButtonLink href={primary.href} tone="accent">
                {primary.label}
              </ButtonLink>
              {secondary?.label && (
                <ButtonLink href={secondary.href} tone="ghostLight">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Steps — numbered "how it works" list
   -------------------------------------------------------------------------- */

export function Steps({
  steps,
  dark = false,
}: {
  steps: { title: string; body: string }[];
  dark?: boolean;
}) {
  return (
    <ol className="space-y-7">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-5">
          <span
            aria-hidden="true"
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-black ${
              dark ? 'bg-white/10 text-brand-orange' : 'bg-brand-blue/10 text-brand-blue'
            }`}
          >
            {i + 1}
          </span>
          <div>
            <h3 className={`font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{step.title}</h3>
            <p className={`mt-1.5 text-sm leading-7 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
