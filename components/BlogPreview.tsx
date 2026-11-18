import BlogCard from '@/components/BlogCard';
import { ButtonLink, SectionHeading } from '@/components/ui';
import type { BlogPostItem } from '@/types';

interface BlogPreviewProps {
  posts: BlogPostItem[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  const previewPosts = posts.slice(0, 3);
  if (previewPosts.length === 0) return null;

  return (
    <section id="blog" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="From the field"
            title="Stories and lessons from our volunteers"
          />
          <div className="flex-shrink-0">
            <ButtonLink href="/blog" tone="outline" size="md">
              All stories
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {previewPosts.map((post) => (
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
      </div>
    </section>
  );
}
