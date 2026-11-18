'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { buttonClass } from '@/components/ui';
import { site } from '@/lib/site';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'What we do' },
  { href: '/blog', label: 'Stories' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main"
        className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="group flex flex-shrink-0 items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          onClick={() => setMenuOpen(false)}
        >
          <Logo priority />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                  isActive(href)
                    ? 'bg-brand-blue/8 text-brand-blue'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs — one per audience */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <Link href="/partner" className={buttonClass('outline', 'md')}>
            Partner with us
          </Link>
          <Link href="/volunteer" className={buttonClass('primary', 'md')}>
            Volunteer
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-brand-blue lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 sm:px-6 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`block rounded-xl px-3 py-3 text-base font-medium transition-colors duration-150 ${
                    isActive(href)
                      ? 'bg-brand-blue/8 text-brand-blue'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/partner"
              onClick={() => setMenuOpen(false)}
              className={buttonClass('outline', 'md', 'py-3')}
            >
              Partner with us
            </Link>
            <Link
              href="/volunteer"
              onClick={() => setMenuOpen(false)}
              className={buttonClass('primary', 'md', 'py-3')}
            >
              Volunteer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
