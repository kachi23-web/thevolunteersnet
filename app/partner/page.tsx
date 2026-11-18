import PartnerForm from '@/components/forms/PartnerForm';
import FormShell from '@/components/forms/FormShell';
import PartnerMarquee from '@/components/PartnerMarquee';
import { partnerSteps } from '@/components/HowItWorks';
import { PageHero } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata = {
  title: `Partner With Us — ${site.name}`,
  description: `Tell us what your organization needs and ${site.name} will recruit, train and manage the volunteers.`,
};

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="For organizations"
        title="You run the programme."
        highlight="We bring the people."
        description="Recruiting and managing volunteers is a full-time job on top of the one you already have. Tell us what you need and we will build a prepared, accountable team around it."
      />

      <FormShell
        heading="How a partnership works"
        steps={partnerSteps}
        formTitle="Request volunteers"
      >
        <PartnerForm />
      </FormShell>

      {/* Current partners */}
      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <p className="mb-8 px-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Organizations we already work with
        </p>
        <PartnerMarquee />
      </section>
    </>
  );
}
