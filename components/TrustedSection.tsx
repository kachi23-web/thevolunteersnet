import Image from 'next/image';

const partners = [
  { name: 'The Young Bookworms', logo: '/bookworms.png' },
  { name: 'Impact Investors Foundation', logo: '/impact.png' },
  { name: 'Woven Impact Network', logo: '/woven.png' },
  { name: 'PlanenTekad Programme', logo: '/planen.png' },
  { name: 'Karis & Eleos Hand of Hope Foundation', logo: '/kairos.png' },
];

const doubled = [...partners, ...partners];

export default function TrustedSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#eef5ff] to-[#f0f6ff] border-y border-blue-100">
      <div className="text-center mb-10 px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
          Trusted By NGOs &amp; Community Organizations
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
              className="relative mx-6 h-16 w-44 shrink-0 rounded-2xl bg-white border border-slate-200 transition-all duration-300 hover:shadow-md"
            >
              <Image
                src={logo}
                alt={i < partners.length ? name : ''}
                fill
                className="object-contain p-3"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
