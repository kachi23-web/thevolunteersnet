import HeroSection from '@/components/HeroSection';
import TrustedSection from '@/components/TrustedSection';
import ServicesSection from '@/components/ServicesSection';
import ImpactSection from '@/components/ImpactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogPreview from '@/components/BlogPreview';
import CtaSection from '@/components/CtaSection';
import {
  getHeroContent,
  getServices,
  getStats,
  getTestimonials,
  getBlogPosts,
  getCtaContent,
} from '@/lib/content';

export default async function Home() {
  const [hero, services, stats, testimonials, posts, cta] = await Promise.all([
    getHeroContent(),
    getServices(),
    getStats(),
    getTestimonials(),
    getBlogPosts(),
    getCtaContent(),
  ]);

  return (
    <>
      <HeroSection content={hero} stats={stats} />
      <TrustedSection />
      <ServicesSection services={services} />
      <ImpactSection stats={stats} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreview posts={posts} />
      <CtaSection content={cta} />
    </>
  );
}
