import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — The Volunteer Nations`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1565C0] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
        >
          ← Back to Blog
        </Link>

        {/* Category badge */}
        <div className="mt-8">
          <span className="inline-flex rounded-full bg-[#F57C00]/10 text-[#F57C00] px-3 py-1 text-xs font-semibold">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="mt-4 text-lg text-slate-600 leading-8">{post.excerpt}</p>

        {/* Cover image */}
        <div className="mt-10 overflow-hidden rounded-[28px]">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full object-cover"
            priority
          />
        </div>

        {/* Body */}
        <div className="mt-12 prose prose-slate max-w-none">
          {post.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mt-6 text-slate-600 leading-8">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
