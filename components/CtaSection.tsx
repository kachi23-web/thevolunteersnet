import Link from 'next/link';
import type { CtaContent } from '@/types';

interface CtaSectionProps {
  content: CtaContent;
}

export default function CtaSection({ content }: CtaSectionProps) {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="rounded-[32px] bg-[#1565C0] p-12 lg:p-20 text-white text-center">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            {content.heading}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80 max-w-xl mx-auto">
            {content.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              href={content.primaryCta.href}
              className="rounded-full bg-white text-[#1565C0] hover:bg-slate-100 transition-colors duration-200 px-8 py-3.5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {content.primaryCta.label}
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors duration-200 px-8 py-3.5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
