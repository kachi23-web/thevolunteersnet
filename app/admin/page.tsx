import Link from "next/link";
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
} from "lucide-react";
import {
  getServices,
  getStats,
  getTestimonials,
  getBlogPosts,
} from "@/lib/content";
import {
  getVolunteerSubmissions,
  getPartnerSubmissions,
} from "@/lib/submissions";

const quickLinks = [
  { href: "/admin/hero", label: "Hero", description: "Manage hero section content", icon: ImageIcon },
  { href: "/admin/services", label: "Services", description: "Edit services offered", icon: Briefcase },
  { href: "/admin/stats", label: "Stats", description: "Update impact statistics", icon: BarChart3 },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    description: "Manage testimonial quotes",
    icon: MessageSquareQuote,
  },
  { href: "/admin/blog", label: "Blog", description: "Create and edit blog posts", icon: FileText },
  { href: "/admin/cta", label: "CTA", description: "Edit call-to-action section", icon: Megaphone },
  { href: "/admin/about", label: "About", description: "Update about page content", icon: Info },
  { href: "/admin/volunteers", label: "Volunteers", description: "View volunteer applications", icon: Users },
  { href: "/admin/partners", label: "Partners", description: "View partner inquiries", icon: Handshake },
];

export default async function AdminDashboardPage() {
  let servicesCount = 0;
  let statsCount = 0;
  let testimonialsCount = 0;
  let blogPostsCount = 0;
  let volunteersCount = 0;
  let partnersCount = 0;

  try {
    const [services, stats, testimonials, blogPosts] = await Promise.all([
      getServices(),
      getStats(),
      getTestimonials(),
      getBlogPosts(),
    ]);

    servicesCount = services.length;
    statsCount = stats.length;
    testimonialsCount = testimonials.length;
    blogPostsCount = blogPosts.length;
  } catch {
    // MongoDB unreachable — counts stay at 0
  }

  try {
    const [volunteers, partners] = await Promise.all([
      getVolunteerSubmissions(),
      getPartnerSubmissions(),
    ]);
    volunteersCount = volunteers.length;
    partnersCount = partners.length;
  } catch {
    // File read failed — counts stay at 0
  }

  const summaryCards = [
    { label: "Services", count: servicesCount, href: "/admin/services" },
    { label: "Stats", count: statsCount, href: "/admin/stats" },
    { label: "Testimonials", count: testimonialsCount, href: "/admin/testimonials" },
    { label: "Blog Posts", count: blogPostsCount, href: "/admin/blog" },
    { label: "Volunteers", count: volunteersCount, href: "/admin/volunteers" },
    { label: "Partners", count: partnersCount, href: "/admin/partners" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome to the Admin Dashboard
        </h1>
        <p className="mt-1 text-slate-600">
          Manage your website content from here. Use the sections below to update
          pages, posts, and site-wide settings.
        </p>
      </div>

      {/* Content Summary Cards */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Content Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-1 text-3xl font-bold text-[#1565C0]">
                {card.count}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map(({ href, label, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#1565C0]/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-[#1565C0] shrink-0" />
                <p className="font-medium text-slate-900">{label}</p>
              </div>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
