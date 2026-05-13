import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  title: string;
  category: string;
  image: string;
  slug: string;
}

export default function BlogCard({ title, category, image, slug }: BlogCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white group hover:shadow-xl transition-shadow duration-300">
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={600}
          height={224}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-7">
        <span className="inline-flex rounded-full bg-[#F57C00]/10 text-[#F57C00] px-3 py-1 text-xs font-semibold">
          {category}
        </span>
        <h3 className="mt-4 text-xl font-bold tracking-tight leading-snug text-slate-900">
          {title}
        </h3>
        <Link
          href={`/blog/${slug}`}
          className="mt-6 inline-block text-[#1565C0] text-sm font-semibold hover:translate-x-1 transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1565C0]"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
