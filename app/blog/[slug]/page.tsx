import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost } from '@/lib/content';
import { formatDate } from '@/components/BlogCard';
import { CtaBand } from '@/components/ui';
import { site } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${site.name}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const published = formatDate(post.createdAt);
  const minutes = Math.max(1, Math.round(post.body.split(/\s+/).length / 200));

  return (
    <>
      <article className="bg-white pb-16 pt-12 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All stories
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex rounded-full bg-brand-orange/12 px-3 py-1 text-xs font-semibold text-[#B45309]">
              {post.category}
            </span>
            {published && <time dateTime={post.createdAt}>{published}</time>}
            <span aria-hidden="true">·</span>
            <span>{minutes} min read</span>
          </div>

          <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-slate-900 lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 text-xl leading-8 text-slate-600">{post.excerpt}</p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] bg-slate-100">
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              preload
            />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-6 px-6 lg:px-8">
          {post.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-lg leading-[1.8] text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <CtaBand
        heading="Be part of the next story"
        description="Every story here started with someone deciding to show up. You could be next."
        primary={{ label: 'Become a volunteer', href: '/volunteer' }}
        secondary={{ label: 'Partner with us', href: '/partner' }}
      />
    </>
  );
}
