import PartnerMarquee from '@/components/PartnerMarquee';

export default function TrustedSection() {
  return (
    <section className="bg-white pt-16 pb-4 lg:pt-20">
      <p className="mb-8 px-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Trusted by NGOs and community organizations
      </p>
      <PartnerMarquee />
    </section>
  );
}
