import VolunteerForm from '@/components/forms/VolunteerForm';
import FormShell from '@/components/forms/FormShell';
import { volunteerSteps } from '@/components/HowItWorks';
import { PageHero } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata = {
  title: `Become a Volunteer — ${site.name}`,
  description: `Sign up to volunteer with ${site.name} and put your skills to work for organizations that need them.`,
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Your skills are needed."
        highlight="Let’s find out where."
        description="You do not need to be an expert or have endless free time. Tell us what you can offer and we will match you with an organization where it makes a real difference."
      />

      <FormShell
        heading="What happens after you apply"
        steps={volunteerSteps}
        formTitle="Volunteer application"
      >
        <VolunteerForm />
      </FormShell>
    </>
  );
}
