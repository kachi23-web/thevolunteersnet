import VolunteerForm from '@/components/forms/VolunteerForm';

export const metadata = {
  title: 'Become a Volunteer — The Volunteer Nations',
  description:
    'Sign up to volunteer with The Volunteer Nations and help connect communities with the support they need.',
};

export default function VolunteerPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#1565C0] font-semibold uppercase tracking-[0.2em] text-xs">
            Get Involved
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            Become a <span className="text-[#1565C0]">Volunteer</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-8 max-w-2xl mx-auto">
            Share your skills, time, and passion with organizations that need them most. Fill in the
            form below and a member of our team will be in touch.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <VolunteerForm />
        </div>
      </section>
    </>
  );
}
