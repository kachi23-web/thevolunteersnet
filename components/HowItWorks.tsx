import { ButtonLink, SectionHeading, Steps } from '@/components/ui';

export const volunteerSteps = [
  {
    title: 'Tell us about you',
    body: 'Fill in a short form with your skills, interests and why you want to serve.',
  },
  {
    title: 'Get matched and prepared',
    body: 'We pair you with an organization that fits, then onboard and train you for the role.',
  },
  {
    title: 'Serve with support',
    body: 'You are never dropped in and left alone. Our team stays with you throughout the placement.',
  },
];

export const partnerSteps = [
  {
    title: 'Tell us what you need',
    body: 'Share your programme, the roles you need filled and the outcomes you are working toward.',
  },
  {
    title: 'Agree the terms',
    body: 'We set clear service agreements, volunteer policies and accountability structures up front.',
  },
  {
    title: 'Receive a managed team',
    body: 'We recruit, screen and train the volunteers, then track performance so you can see the results.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Three steps, whichever side you are on"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              For volunteers
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
              Put your skills where they count
            </h3>
            <div className="mt-8 flex-1">
              <Steps steps={volunteerSteps} />
            </div>
            <div className="mt-10">
              <ButtonLink href="/volunteer">Apply to volunteer</ButtonLink>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl bg-brand-navy p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
              For organizations
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
              Get a team you can rely on
            </h3>
            <div className="mt-8 flex-1">
              <Steps steps={partnerSteps} dark />
            </div>
            <div className="mt-10">
              <ButtonLink href="/partner" tone="accent">
                Request volunteers
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
