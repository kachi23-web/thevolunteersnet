"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import {
  ImageIcon,
  Briefcase,
  BarChart3,
  MessageSquareQuote,
  FileText,
  Megaphone,
  Info,
  Users,
  Handshake,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navLinks = [
  { href: "/admin/hero", label: "Hero", icon: ImageIcon },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/cta", label: "CTA", icon: Megaphone },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
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
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1565C0] text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-slate-700 space-y-1">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors text-left"
        >
          <LogOut className="h-4 w-4 shrink-0" />
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
