import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  category: string;
  image: string;
  slug: string;
  excerpt?: string;
  date?: string;
}

export function formatDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function BlogCard({ title, category, image, slug, excerpt, date }: BlogCardProps) {
  const formatted = formatDate(date);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(13,27,62,0.3)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-blue">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex rounded-full bg-brand-orange/12 px-3 py-1 font-semibold text-[#B45309]">
            {category}
          </span>
          {formatted && (
            <time dateTime={date} className="text-slate-500">
              {formatted}
            </time>
          )}
        </div>
        <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-slate-900">
          <Link href={`/blog/${slug}`} className="outline-none after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        {excerpt && (
          <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-slate-600">{excerpt}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-blue">
          Read the story
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
