import { blogPosts } from '@/lib/data';
import BlogCard from '@/components/BlogCard';

export const metadata = {
  title: 'Blog — The Volunteer Nations',
  description:
    'Stories, insights, and updates from The Volunteer Nations community.',
};

export default function BlogPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-[#1565C0] font-semibold uppercase tracking-[0.2em] text-xs">
            Our Blog
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
            News &amp; <span className="text-[#1565C0]">Insights</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-8 max-w-2xl mx-auto">
            Impact stories, community news, and volunteer insights from across the TVN network.
          </p>
        </div>
      </section>

      {/* Blog grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
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
    </>
  );
}
