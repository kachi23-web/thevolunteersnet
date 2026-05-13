'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/',          label: 'Home'      },
  { href: '/services',  label: 'Services'  },
  { href: '/about',     label: 'About'     },
  { href: '/blog',      label: 'Blog'      },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/partner',   label: 'Partner'   },
  { href: '/contact',   label: 'Contact'   },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/tvn-logo-3.png"
            alt="The Volunteer Nations"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="text-lg font-black tracking-tight text-slate-900">
            The Volunteer's Nation
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname === href
                    ? 'text-[#1565C0]'
                    : 'text-slate-600 hover:text-[#1565C0]'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/volunteer"
            className="bg-[#1565C0] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#0D47A1] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
          >
            Become a Volunteer
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-[#1565C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
        >
          {menuOpen ? (
            /* X icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-100 bg-white px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                    pathname === href
                      ? 'text-[#1565C0] bg-blue-50'
                      : 'text-slate-600 hover:text-[#1565C0] hover:bg-slate-50'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <Link
              href="/volunteer"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-[#1565C0] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#0D47A1] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
