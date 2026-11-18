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
              title={name}
              className="group mx-3 flex h-24 w-60 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(13,27,62,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-blue/30 hover:shadow-[0_12px_28px_-14px_rgba(13,27,62,0.3)]"
            >
              <span className="relative h-full w-full">
                <Image
                  src={logo}
                  alt={copy === 0 ? name : ''}
                  fill
                  sizes="208px"
                  className="object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                />
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
