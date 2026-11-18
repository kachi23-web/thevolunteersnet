import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';
import ServiceIcon from '@/components/ServiceIcon';
import { SectionHeading } from '@/components/ui';
import { generateSlug } from '@/lib/utils';

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=75&w=900&auto=format&fit=crop`;

/** Used when a service has no image of its own, in display order. */
const fallbackImages = [
  { src: unsplash('photo-1559027615-cd4628902d4a'), alt: 'A volunteer in a bright volunteer shirt at an event' },
  { src: unsplash('photo-1524178232363-1fb2b075b655'), alt: 'A facilitator leading a training workshop' },
  { src: unsplash('photo-1593113630400-ea4288922497'), alt: 'Volunteers carrying supplies to a community distribution' },
];

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Good intentions need good structure"
            description="Most volunteer efforts fail on logistics, not on heart. We handle the finding, preparing and managing, so the people who show up can actually help."
          />
          <Link
            href="/services"
            className="inline-flex flex-shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            See how each service works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const fallback = fallbackImages[i % fallbackImages.length];
            const image = service.image
              ? { src: service.image, alt: '' }
              : fallback;
            return (
            <li key={service.title}>
              <Link
                href={`/services#${generateSlug(service.title)}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-[0_16px_40px_-20px_rgba(13,27,62,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent" />
                  <span aria-hidden="true" className="absolute right-5 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-black tabular-nums text-brand-navy backdrop-blur">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-8 pb-8">
                  <span className="relative -mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-blue shadow-[0_8px_24px_-10px_rgba(13,27,62,0.35)] ring-1 ring-slate-200 transition-colors duration-200 group-hover:bg-brand-blue group-hover:text-white group-hover:ring-brand-blue">
                    <ServiceIcon name={service.icon} className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-slate-600">
                  {service.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                  Learn more
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                </div>
              </Link>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
