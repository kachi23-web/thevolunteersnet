import ServicesSection from '@/components/ServicesSection';
import Link from 'next/link';
import { services } from '@/lib/data';
import {
  HeartHandshake,
  GraduationCap,
  Globe2,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  GraduationCap,
  Globe2,
};

export const metadata = {
  title: 'Services — The Volunteer Nations',
  description:
    'Explore the programs and services TVN offers to connect volunteers with organizations that need them.',
};

const expandedServices = services.map((service) => {
  const expansions: Record<string, string> = {
    'Volunteer Recruitment':
      'Our recruitment process goes beyond posting listings. We actively source, screen, and match volunteers based on skills, availability, and organizational fit — ensuring every placement is purposeful and productive from day one.',

    'Training & Development':
      'We provide structured onboarding, role-specific training, and ongoing capacity-building workshops for both volunteers and the nonprofits they serve. Volunteers leave better equipped; organizations become more effective.',

    'Community Programs':
      'From neighborhood clean-ups to long-term mentorship initiatives, our community programs are co-designed with local stakeholders to address real needs. We provide coordination, resources, and volunteer support throughout.',
  };

  return {
    ...service,
    expanded: expansions[service.title] ?? service.description,
  };
});

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full bg-[#1565C0]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1565C0]">
            Our Services
          </span>

          <h1 className="mt-6 text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            What We <span className="text-[#1565C0]">Offer</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
            TVN provides end-to-end volunteer management solutions — from
            finding the right people to building systems that keep them engaged.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <ServicesSection services={services} />

      {/* EXPANDED SERVICES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <span className="text-[#1565C0] font-semibold uppercase tracking-[0.2em] text-xs">
              Service Breakdown
            </span>

            <h2 className="mt-4 text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
              A Closer Look
            </h2>

            <p className="mt-5 text-slate-600 leading-8">
              Each service is intentionally designed to solve real challenges
              within the volunteer ecosystem.
            </p>
          </div>

          <div className="space-y-10">
            {expandedServices.map((service) => {
              const Icon = iconMap[service.icon];

              return (
                <div
                  key={service.title}
                  className="group rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1565C0]/10 border border-[#1565C0]/10">
                        {Icon && (
                          <Icon
                            className="w-8 h-8 text-[#1565C0]"
                            strokeWidth={1.8}
                          />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                        {service.title}
                      </h3>

                      <p className="mt-4 text-slate-600 leading-8">
                        {service.description}
                      </p>

                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <p className="text-slate-600 leading-8">
                          {service.expanded}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#1565C0] py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to Get Started?
          </h2>

          <p className="mt-6 text-lg leading-8 text-white/80 max-w-2xl mx-auto">
            Whether you want to volunteer your skills or bring TVN&apos;s
            programs to your organization, we&apos;d love to hear from you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/volunteer"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#1565C0] px-8 py-4 text-sm font-semibold hover:bg-slate-100 transition-all duration-200"
            >
              Become a Volunteer
            </Link>

            <Link
              href="/partner"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white px-8 py-4 text-sm font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}