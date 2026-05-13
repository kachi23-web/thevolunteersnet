import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us — The Volunteer Nations',
  description:
    'Get in touch with The Volunteer Nations. Reach us by email, phone, or follow us on social media.',
};

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/p/18bvVDcaVM/?mibextid=wwXIfr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/the-volunteers-nation',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.027-3.059-1.864-3.059-1.865 0-2.151 1.457-2.151 2.962v5.701h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.002 3.604 4.604v5.592z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thevolunteersnation?igsh=MWlydjg0OGdkaDlrNQ%3D%3D&utm_source=qr',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-1.613.074-3.067.372-4.204 1.508C1.712 2.716 1.414 4.17 1.34 5.783 1.282 7.063 1.268 7.471 1.268 12c0 4.529.014 4.937.072 6.217.074 1.613.372 3.067 1.508 4.204 1.137 1.136 2.591 1.434 4.204 1.508 1.28.058 1.688.072 4.948.072s3.667-.014 4.947-.072c1.613-.074 3.067-.372 4.204-1.508 1.136-1.137 1.434-2.591 1.508-4.204.058-1.28.072-1.688.072-4.948s-.014-3.667-.072-4.947c-.074-1.613-.372-3.067-1.508-4.204C19.064 1.712 17.61 1.414 15.997 1.34 14.717 1.282 14.309 1.268 12 1.268zm0 5.838a4.894 4.894 0 100 9.788 4.894 4.894 0 000-9.788zm0 8.073a3.179 3.179 0 110-6.358 3.179 3.179 0 010 6.358zm6.406-8.845a1.144 1.144 0 100-2.288 1.144 1.144 0 000 2.288z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#1565C0] font-semibold uppercase tracking-[0.2em] text-xs">
            Reach Out
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            Get in <span className="text-[#1565C0]">Touch</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-8 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out via any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact details */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2">

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-1">Email</h2>
                <a
                  href="mailto:thevolunteernations.org"
                  className="text-slate-800 hover:text-[#1565C0] transition-colors font-medium"
                >
                  thevolunteernations.org
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-1">Phone</h2>
                <a
                  href="tel:+2349077631264"
                  className="text-slate-800 hover:text-[#1565C0] transition-colors font-medium"
                >
                  09077631264
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-1">Location</h2>
                <p className="text-slate-800 font-medium">Nigeria</p>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-2">Social Links</h2>
                <div className="flex gap-3">
                  {socialLinks.map(({ label, href, icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#1565C0] hover:text-white text-slate-600 flex items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
                    >
                      {icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
