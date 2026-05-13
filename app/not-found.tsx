import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | The Volunteer Nations',
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-8xl font-black text-[#1565C0]">404</p>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-4 text-slate-600 leading-7 max-w-md">
        Sorry, we couldn&apos;t find the page you were looking for. It may have moved or no longer
        exists.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#1565C0] text-white font-semibold px-7 py-3 hover:bg-[#0D47A1] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
      >
        Back to Home
      </Link>
    </main>
  );
}
