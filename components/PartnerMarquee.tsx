import Image from 'next/image';
import { partners } from '@/lib/site';

/**
 * Scrolling strip of partner logos. The second copy of the list exists only
 * to make the loop seamless, so it is hidden from assistive tech and removed
 * entirely when the visitor prefers reduced motion.
 */
export default function PartnerMarquee() {
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <ul className="marquee-track flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
        {[0, 1].map((copy) =>
          partners.map(({ name, logo }) => (
            <li
              key={`${name}-${copy}`}
              aria-hidden={copy === 1 ? true : undefined}
              className="relative mx-4 h-16 w-44 shrink-0 rounded-2xl border border-slate-200 bg-white"
            >
              <Image
                src={logo}
                alt={copy === 0 ? name : ''}
                fill
                sizes="176px"
                className="object-contain p-3"
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
