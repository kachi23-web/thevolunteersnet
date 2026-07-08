"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const navLinks = [
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/cta", label: "CTA" },
  { href: "/admin/about", label: "About" },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col min-h-full">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-slate-700">
        <Link href="/admin" className="text-lg font-bold text-white">
          TVN Admin
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1565C0] text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-slate-700">
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors text-left"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="fixed inset-0 z-[100] flex bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </SessionProvider>
  );
}
