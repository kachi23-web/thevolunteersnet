'use client';

import { useEffect } from 'react';
import { ButtonLink, buttonClass } from '@/components/ui';
import { site } from '@/lib/site';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page-hero-bg flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
        Something broke
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
        This page did not load properly
      </h1>
      <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
        The problem is on our side, not yours. Try again, and if it keeps happening please let us
        know at{' '}
        <a href={`mailto:${site.email}`} className="font-semibold text-brand-blue hover:underline">
          {site.email}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className={buttonClass('primary')}>
          Try again
        </button>
        <ButtonLink href="/" tone="outline">
          Back to home
        </ButtonLink>
      </div>
    </div>
  );
}
