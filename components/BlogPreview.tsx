import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import BlogCard from '@/components/BlogCard';

export default function BlogPreview() {
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="text-[#1565C0] uppercase tracking-[0.2em] text-xs font-semibold">
              Latest Insights
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight max-w-xl text-slate-900">
              News, Stories &amp; Volunteer Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold hover:border-[#1565C0] hover:text-[#1565C0] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
          >
            View All Articles
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {previewPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              category={post.category}
              image={post.image}
              slug={post.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
