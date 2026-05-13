import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | The Volunteer Nations',
  description:
    'Learn about The Volunteer Nations — our mission, values, and the team behind the movement.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 0% 0%, #bfdbfe 0%, transparent 70%), radial-gradient(ellipse 55% 70% at 100% 20%, #fde8d0 0%, transparent 65%), #f0f7ff',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-flex items-center rounded-full border border-[#1565C0]/20 bg-[#1565C0]/5 px-4 py-1.5 text-sm font-medium text-[#1565C0] mb-8">
              Who We Are
            </span>
            <h1 className="text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight text-slate-900">
              Driven by Purpose,
              <span className="block text-[#1565C0]">Powered by People</span>
            </h1>
            <p className="mt-8 text-lg leading-8 text-slate-600 max-w-xl">
              The Volunteer Nations is a volunteer-driven organization committed
              to amplifying the impact of social initiatives by connecting them
              with skilled, passionate volunteers.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/volunteer"
                className="rounded-full bg-[#1565C0] hover:bg-[#0D47A1] transition-colors duration-200 px-7 py-3.5 text-white font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
              >
                Join Our Team
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#1565C0] text-[#1565C0] hover:bg-[#1565C0]/10 transition-colors duration-200 px-7 py-3.5 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative rounded-[32px] overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1400&auto=format&fit=crop"
              alt="The Volunteer Nations team members at a community event"
              width={700}
              height={600}
              className="w-full h-[600px] object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 grid md:grid-cols-2 gap-12">
        <div className="bg-[#1565C0]/5 rounded-3xl p-10">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-8">
            To bridge the gap between organizations and volunteers by providing
            structured, reliable, and impactful volunteer engagement systems.
          </p>
        </div>
        <div className="bg-orange-50 rounded-3xl p-10">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Our Vision</h2>
          <p className="text-slate-600 leading-8">
            To become the world&apos;s leading volunteer mobilization platform,
            creating a global network of changemakers committed to transforming
            lives and driving sustainable development.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="bg-slate-900 rounded-3xl p-10 lg:p-14">
          <h2 className="text-3xl font-black text-white mb-4">Our Approach</h2>
          <p className="text-slate-300 leading-8 mb-10 max-w-2xl">
            We don&apos;t just send volunteers — we build systems.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Clear Service Agreements', icon: '📋' },
              { title: 'Volunteer Policies', icon: '📜' },
              { title: 'Accountability Structures', icon: '🏗️' },
              { title: 'Performance Tracking', icon: '📊' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/10 rounded-2xl p-6 border border-white/10"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <p className="text-white font-semibold leading-6">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Community First',
                description:
                  'Every decision we make is guided by the needs of the communities we serve.',
              },
              {
                title: 'Purposeful Matching',
                description:
                  'We align volunteer skills with organizational needs to maximize real-world impact.',
              },
              {
                title: 'Continuous Growth',
                description:
                  'We invest in volunteers and partners through training, support, and recognition.',
              },
              {
                title: 'Transparency',
                description:
                  'We operate with openness and accountability in everything we do.',
              },
              {
                title: 'Inclusivity',
                description:
                  'We welcome volunteers and partners from all backgrounds, cultures, and walks of life.',
              },
              {
                title: 'Measurable Impact',
                description:
                  'We track outcomes — not just effort — to ensure our work creates lasting change.',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-7">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-6">
          Ready to Make a Difference?
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-10 leading-8">
          Whether you want to volunteer, partner with us, or simply learn more —
          we would love to hear from you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
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
      </section>
    </>
  );
}
