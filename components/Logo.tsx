import Image from 'next/image';

/**
 * Brand lockup: transparent emblem + stacked wordmark.
 * `tone="dark"` is for dark backgrounds (footer).
 */
export default function Logo({
  tone = 'light',
  priority = false,
}: {
  tone?: 'light' | 'dark';
  priority?: boolean;
}) {
  const dark = tone === 'dark';
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/tvn-mark-transparent.png"
        alt=""
        width={109}
        height={105}
        className="h-11 w-auto transition-transform duration-200 group-hover:scale-105"
        preload={priority}
      />
      <span aria-hidden="true" className="flex flex-col leading-none">
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
            dark ? 'text-brand-orange' : 'text-brand-blue'
          }`}
        >
          The Volunteers
        </span>
        <span
          className={`mt-1 text-[21px] font-extrabold uppercase tracking-[0.04em] ${
            dark ? 'text-white' : 'text-brand-navy'
          }`}
        >
          Nation
        </span>
      </span>
    </span>
  );
}
