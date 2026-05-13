import Image from 'next/image';
import PartnerForm from '@/components/forms/PartnerForm';

const partners = [
  { name: 'The Young Bookworms', logo: '/bookworms.png' },
  { name: 'Impact Investors Foundation', logo: '/impact.png' },
  { name: 'Woven Impact Network', logo: '/woven.png' },
  { name: 'PlanenTekad Programme', logo: '/planen.png' },
  { name: 'Karis & Eleos Hand of Hope Foundation', logo: '/kairos.png' },
];

const doubled = [...partners, ...partners];

export const metadata = {
  title: 'Partner With Us — The Volunteer Nations',
  description:
    'Submit a partnership inquiry and connect your organization with skilled volunteers through The Volunteer Nations.',
};

export default function PartnerPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#F57C00] font-semibold uppercase tracking-[0.2em] text-xs">
            Organizations
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            Partner <span className="text-[#1565C0]">With Us</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-8 max-w-2xl mx-auto">
            Connect your organization with passionate, skilled volunteers. Fill in the form below
            and our team will reach out to discuss how TVN can support your mission.
          </p>
        </div>
      </section>

      {/* Partner carousel */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
            Our Current Partners
          </p>
        </div>

        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
            {doubled.map(({ name, logo }, i) => (
              <div
                key={`${name}-${i}`}
                className="relative mx-8 h-16 w-40 shrink-0 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Image src={logo} alt={i < partners.length ? name : ''} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <PartnerForm />
        </div>
      </section>
    </>
  );
}
