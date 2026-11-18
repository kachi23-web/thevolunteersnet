import type { TestimonialItem } from '@/types';
import { SectionHeading } from '@/components/ui';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section id="stories" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="In their words" title="What our partners say" />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 33 24"
                className="h-7 w-9 text-brand-orange"
                fill="currentColor"
              >
                <path d="M0 24V14.4C0 6.4 4.4 1.6 13.2 0l1.6 3.6C10 4.8 7.6 7.6 7.6 11.2H14V24H0zm18 0V14.4C18 6.4 22.4 1.6 31.2 0l1.6 3.6c-4.8 1.2-7.2 4-7.2 7.6H32V24H18z" />
              </svg>
              <blockquote className="mt-6 flex-1 text-xl font-medium leading-9 text-slate-800">
                {item.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-6">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white"
                >
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-bold text-slate-900">{item.name}</span>
                  <span className="block text-sm text-slate-500">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
