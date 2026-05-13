import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="rounded-[32px] bg-[#1565C0] p-12 lg:p-20 text-white text-center">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            Ready To Make A Difference?
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80 max-w-xl mx-auto">
            Whether you&apos;re an organization or an individual ready to serve, there&apos;s a place for
            you in our global community.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href="/volunteer"
              className="rounded-full bg-white text-[#1565C0] hover:bg-slate-100 transition-colors duration-200 px-8 py-3.5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/partner"
              className="rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors duration-200 px-8 py-3.5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
