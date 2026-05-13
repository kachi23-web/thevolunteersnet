import { HeartHandshake, GraduationCap, Globe2, type LucideIcon } from 'lucide-react';
import type { Service } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  GraduationCap,
  Globe2,
};

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#1565C0] font-semibold uppercase tracking-[0.2em] text-xs">
            What We Do
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Building Sustainable Volunteer Ecosystems
          </h2>
          <p className="mt-5 text-lg text-slate-600 leading-8">
            Structured systems that help organizations recruit, train, and manage volunteers efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-[28px] p-8 border border-slate-200 bg-white hover:border-[#1565C0]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1565C0]/8 flex items-center justify-center mb-6">
                {(() => { const Icon = iconMap[service.icon]; return Icon ? <Icon className="w-7 h-7 text-[#1565C0]" strokeWidth={1.5} /> : null; })()}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">{service.title}</h3>
              <p className="mt-4 text-slate-600 leading-7 text-sm">{service.description}</p>
              <span className="mt-6 inline-block text-[#1565C0] text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                Learn More →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
