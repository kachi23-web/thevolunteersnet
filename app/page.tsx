import HeroSection from '@/components/HeroSection';
import TrustedSection from '@/components/TrustedSection';
import ServicesSection from '@/components/ServicesSection';
import ImpactSection from '@/components/ImpactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogPreview from '@/components/BlogPreview';
import CtaSection from '@/components/CtaSection';
import { services } from '@/lib/data';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <ServicesSection services={services} />
      <ImpactSection />
      <TestimonialsSection />
      <BlogPreview />
      <CtaSection />
    </>
  );
}
