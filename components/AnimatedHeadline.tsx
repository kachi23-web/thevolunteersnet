'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Reveals a headline word by word when it scrolls into view. Text after an
 * em/en dash (or a colon) is the punchline: it turns orange and gets an
 * underline that draws in. Screen readers get the plain sentence.
 */
export default function AnimatedHeadline({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const match = text.match(/^(.*?)(\s*[—–:]\s*)(.+)$/);
  const lead = match ? match[1] : text;
  const sep = match ? match[2].trim() : '';
  const punch = match ? match[3] : '';

  const leadWords = lead.split(/\s+/).filter(Boolean);
  const punchWords = punch.split(/\s+/).filter(Boolean);
  const STEP = 70; // ms between words

  const word = (w: string, i: number, extra = '') => (
    <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <span
        className={`inline-block translate-y-[110%] opacity-0 transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[shown=true]/headline:translate-y-0 group-data-[shown=true]/headline:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${extra}`}
        style={{ transitionDelay: `${i * STEP}ms` }}
      >
        {w}
      </span>
      &nbsp;
    </span>
  );

  const punchStart = leadWords.length + (sep ? 1 : 0);

  return (
    <span ref={ref} data-shown={shown} className="group/headline">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {leadWords.slice(0, sep ? -1 : undefined).map((w, i) => word(w, i))}
        {/* Keep the dash on the same line as the word before it */}
        {sep && (
          <span className="whitespace-nowrap">
            {leadWords.length > 0 && word(leadWords[leadWords.length - 1], leadWords.length - 1)}
            {word(sep, leadWords.length, 'text-slate-400')}
          </span>
        )}
        {punchWords.length > 0 && (
          <span className="relative inline-block whitespace-nowrap">
            {punchWords.map((w, i) => word(w, punchStart + i, 'text-brand-orange'))}
            <svg
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -bottom-1 left-0 h-3 w-[calc(100%-0.3em)] text-brand-orange"
            >
              <path
                className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-data-[shown=true]/headline:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0] motion-reduce:transition-none"
                style={{ transitionDelay: `${(punchStart + punchWords.length) * STEP + 150}ms` }}
                d="M2 9 C 60 3, 140 2, 298 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                pathLength={1}
              />
            </svg>
          </span>
        )}
      </span>
    </span>
  );
}
