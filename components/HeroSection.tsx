import Image from 'next/image';
import Link from 'next/link';
import { stats } from '@/lib/data';

export default function HeroSection() {
  return (
    <section
      style={{
        background:
          'radial-gradient(ellipse 60% 80% at 0% 0%, #bfdbfe 0%, transparent 70%), radial-gradient(ellipse 55% 70% at 100% 20%, #fde8d0 0%, transparent 65%), #f0f7ff',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

        {/* Text column */}
        <div className="animate-[fadeInUp_0.6s_ease-out_forwards]">
          <span className="inline-flex items-center rounded-full border border-[#1565C0]/20 bg-[#1565C0]/5 px-4 py-1.5 text-sm font-medium text-[#1565C0] mb-8">
            Empowering Communities Worldwide
          </span>

          <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight text-slate-900">
            Connecting
            <span className="block text-[#1565C0]">Skilled Volunteers</span>
            To Real Impact
          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-600 max-w-xl">
            We help nonprofits, NGOs, and community organizations recruit,
            train, and manage volunteers that create measurable impact.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              href="/volunteer"
              className="rounded-full bg-[#1565C0] hover:bg-[#0D47A1] transition-colors duration-200 px-7 py-3.5 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/partner"
              className="rounded-full border border-[#1565C0] text-[#1565C0] hover:bg-[#1565C0]/10 transition-colors duration-200 px-7 py-3.5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
            >
              Partner With Us
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-10 mt-14 pt-10 border-t border-slate-100">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black text-[#1565C0]">{stat.value}</p>
                <p className="text-slate-500 mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image column */}
        <div className="relative rounded-[32px] overflow-hidden shadow-xl">
          <Image
            src="/hero-img.png"
            alt="The Volunteer Nations team members smiling at a community event"
            width={700}
            height={600}
            className="w-full h-[600px] object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
