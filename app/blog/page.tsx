import { getBlogPosts } from '@/lib/content';
import BlogCard from '@/components/BlogCard';
import { ButtonLink, PageHero } from '@/components/ui';
import { site } from '@/lib/site';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: `Stories — ${site.name}`,
  description: `Stories, lessons and updates from the ${site.name} community.`,
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="From the field,"
        highlight="in our own words"
        description="What we are learning, who we are meeting, and what changes when the right people show up."
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 p-10 text-center">
              <h2 className="text-xl font-bold text-slate-900">No stories yet</h2>
              <p className="mt-2 leading-7 text-slate-600">
                We are writing the first ones now. In the meantime, come and be part of one.
              </p>
              <div className="mt-6">
                <ButtonLink href="/volunteer" size="md">
                  Become a volunteer
                </ButtonLink>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  category={post.category}
                  image={post.image}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  date={post.createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
