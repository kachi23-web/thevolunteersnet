import type { HeroContent } from '@/types';
import HeroCarousel from '@/components/HeroCarousel';

interface HeroSectionProps {
  content: HeroContent;
}

/**
 * HeroSection — server component.
 *
 * Fetches nothing itself; data arrives as props from the parent page.
 * Delegates all interactive carousel behaviour to the HeroCarousel client
 * component so this file remains a lightweight, zero-JS server boundary.
 */
export default function HeroSection({ content }: HeroSectionProps) {
  return <HeroCarousel firstSlide={content} />;
}
