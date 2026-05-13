import { stats } from '@/lib/data';

export default function ImpactSection() {
  return (
    <section id="impact" className="py-28 bg-[#0D1B3E] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#F57C00] uppercase tracking-[0.2em] text-xs font-semibold">
            Our Impact
          </span>
          <h2 className="mt-5 text-4xl lg:text-5xl font-black leading-tight">
            Every Volunteer Creates A Ripple Effect
          </h2>
          <p className="mt-6 text-slate-300 text-lg leading-8 max-w-lg">
            Through strategic partnerships and structured volunteer systems, we help communities
            access the support they need to grow and thrive.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] border border-white/10 bg-white/5 p-8 hover:bg-white/8 transition-colors duration-200"
            >
              <p className="text-4xl font-black text-[#F57C00]">{stat.value}</p>
              <p className="mt-3 text-slate-300 text-sm leading-6">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
