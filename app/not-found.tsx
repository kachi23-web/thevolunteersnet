import { ButtonLink } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata = {
  title: `Page Not Found | ${site.name}`,
};

export default function NotFound() {
  return (
    <div className="page-hero-bg flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">Error 404</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
        We could not find that page
      </h1>
      <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
        It may have moved, or the link may be out of date. Here are two good places to start
        instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/volunteer" tone="outline">
          Become a volunteer
        </ButtonLink>
      </div>
    </div>
  );
}
