import ServiceIcon from '@/components/ServiceIcon';
import HowItWorks from '@/components/HowItWorks';
import { ButtonLink, CtaBand, PageHero } from '@/components/ui';
import { getServices } from '@/lib/content';
import { site } from '@/lib/site';
import { generateSlug } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: `What We Do — ${site.name}`,
  description:
    'Volunteer recruitment, training and community programmes — how TVN connects organizations with volunteers who are ready to help.',
};

// Fallback detail copy for services that don't have `expanded` in the content layer
const expansions: Record<string, string> = {
  'Volunteer Recruitment':
    'Our recruitment process goes beyond posting listings. We actively source, screen, and match volunteers based on skills, availability, and organizational fit — ensuring every placement is purposeful and productive from day one.',

  'Training & Development':
    'We provide structured onboarding, role-specific training, and ongoing capacity-building workshops for both volunteers and the nonprofits they serve. Volunteers leave better equipped; organizations become more effective.',

  'Community Programs':
    'From neighborhood clean-ups to long-term mentorship initiatives, our community programs are co-designed with local stakeholders to address real needs. We provide coordination, resources, and volunteer support throughout.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Everything between a willing volunteer and"
        highlight="work that matters"
        description="Finding people is the easy part. Finding the right people, preparing them and keeping them engaged is where most volunteer programmes struggle. That is the part we take on."
      >
        <ButtonLink href="/partner">Request volunteers</ButtonLink>
        <ButtonLink href="/volunteer" tone="outline">
          Become a volunteer
        </ButtonLink>
      </PageHero>

      {/* Services in detail */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <ol className="space-y-6">
            {services.map((service, i) => {
              const detail = service.expanded ?? expansions[service.title];

              return (
                <li
                  key={service.title}
                  id={generateSlug(service.title)}
                  className="rounded-3xl border border-slate-200 bg-white p-8 target:border-brand-blue target:shadow-[0_0_0_4px_rgba(21,101,192,0.12)] sm:p-10"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
                    <div className="flex flex-shrink-0 items-center gap-4 sm:flex-col sm:items-start">
                      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/8 text-brand-blue">
                        <ServiceIcon name={service.icon} className="h-8 w-8" strokeWidth={1.5} />
                      </span>
                      <span aria-hidden="true" className="text-sm font-black tabular-nums text-slate-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-lg font-medium leading-8 text-slate-800">
                        {service.description}
                      </p>
                      {detail && (
                        <p className="mt-4 border-t border-slate-100 pt-4 leading-8 text-slate-600">
                          {detail}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <HowItWorks />

      <CtaBand
        heading="Not sure which service fits?"
        description="Tell us what your organization is trying to achieve and we will recommend where to start. No commitment needed."
        primary={{ label: 'Talk to our team', href: '/contact' }}
        secondary={{ label: 'Request volunteers', href: '/partner' }}
      />
    </>
  );
}
