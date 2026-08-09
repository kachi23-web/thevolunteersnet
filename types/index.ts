// Shared CTA link type used across multiple content models
export interface CtaLink {
  label: string;
  href: string;
}

// --- Primary content data models ---

export interface HeroContent {
  badge: string;
  headingLine1: string;
  headingHighlight: string;
  headingLine2: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  heroImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  expanded?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface BlogPostItem {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface CtaContent {
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface AboutContent {
  hero: {
    badge: string;
    headingLine1: string;
    headingHighlight: string;
    description: string;
    heroImage: string;
  };
  mission: string;
  vision: string;
  approach: {
    description: string;
    items: Array<{ title: string; icon: string }>;
  };
  values: Array<{ title: string; description: string }>;
}

// --- Form submission types ---

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

export interface VolunteerSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  motivation: string;
  submittedAt: string;
}

export interface PartnerSubmission {
  id: string;
  organizationName: string;
  contactName: string;
  email: string;
  organizationType: string;
  volunteerNeeds: string;
  submittedAt: string;
}

// --- Backward-compatible type aliases ---
// These map old interface names to the new ones but make newly-added fields optional,
// so existing static data in lib/data.ts continues to compile without modification.

export type Service = Omit<ServiceItem, 'id'> & { id?: string };
export type Stat = Omit<StatItem, 'id'> & { id?: string };
export type Testimonial = Omit<TestimonialItem, 'id'> & { id?: string };
export type BlogPost = Omit<BlogPostItem, 'createdAt' | 'updatedAt'> & {
  createdAt?: string;
  updatedAt?: string;
};
