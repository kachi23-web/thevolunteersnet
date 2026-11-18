import type { ReactNode } from 'react';
import { Steps } from '@/components/ui';
import { site } from '@/lib/site';

/**
 * Two-column layout shared by the volunteer and partner pages: what happens
 * next on the left, the form in a card on the right.
 */
export default function FormShell({
  heading,
  steps,
  formTitle,
  children,
}: {
  heading: string;
  steps: { title: string; body: string }[];
  formTitle: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-8">
        <div className="lg:pt-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {heading}
          </h2>
          <div className="mt-8">
            <Steps steps={steps} />
          </div>
          <p className="mt-10 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600">
            Prefer to talk first? Email{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              {site.email}
            </a>{' '}
            or call{' '}
            <a
              href={site.phoneHref}
              className="whitespace-nowrap font-semibold text-brand-blue underline-offset-4 hover:underline"
            >
              {site.phoneDisplay}
            </a>
            .
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(13,27,62,0.35)] sm:p-10">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">{formTitle}</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            All fields are required.
          </p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
