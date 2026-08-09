'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-8xl font-black text-[#1565C0]">500</p>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
        Something went wrong
      </h1>
      <p className="mt-4 text-slate-600 leading-7 max-w-md">
        An unexpected error occurred. Please try again or come back later.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-[#1565C0] text-white font-semibold px-7 py-3 hover:bg-[#0D47A1] transition-colors duration-200"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-[#1565C0] text-[#1565C0] font-semibold px-7 py-3 hover:bg-blue-50 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
