import { getDb } from "@/lib/mongodb";
import type {
  HeroContent,
  ServiceItem,
  StatItem,
  TestimonialItem,
  BlogPostItem,
  CtaContent,
  AboutContent,
} from "@/types";
import { services, stats, testimonials, blogPosts } from "@/lib/data";

// Collection names
const COLLECTIONS = {
  hero: "hero",
  services: "services",
  stats: "stats",
  testimonials: "testimonials",
  blog: "blog",
  cta: "cta",
  about: "about",
} as const;

// --- Default content (used for seeding) ---

const DEFAULT_HERO_CONTENT: HeroContent = {
  badge: "Empowering Communities Worldwide",
  headingLine1: "Connecting",
  headingHighlight: "Skilled Volunteers",
  headingLine2: "To Real Impact",
  description:
    "We help nonprofits, NGOs, and community organizations recruit, train, and manage volunteers that create measurable impact.",
  primaryCta: { label: "Become a Volunteer", href: "/volunteer" },
  secondaryCta: { label: "Partner With Us", href: "/partner" },
  heroImage: "/hero-img.png",
};

const DEFAULT_CTA_CONTENT: CtaContent = {
  heading: "Ready To Make A Difference?",
  description:
    "Whether you're an organization or an individual ready to serve, there's a place for you in our global community.",
  primaryCta: { label: "Become a Volunteer", href: "/volunteer" },
  secondaryCta: { label: "Partner With Us", href: "/partner" },
};

const DEFAULT_ABOUT_CONTENT: AboutContent = {
  hero: {
    badge: "Who We Are",
    headingLine1: "Driven by Purpose,",
    headingHighlight: "Powered by People",
    description:
      "The Volunteer Nations is a volunteer-driven organization committed to amplifying the impact of social initiatives by connecting them with skilled, passionate volunteers.",
    heroImage:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1400&auto=format&fit=crop",
  },
  mission:
    "To bridge the gap between organizations and volunteers by providing structured, reliable, and impactful volunteer engagement systems.",
  vision:
    "To become the world's leading volunteer mobilization platform, creating a global network of changemakers committed to transforming lives and driving sustainable development.",
  approach: {
    description: "We don't just send volunteers — we build systems.",
    items: [
      { title: "Clear Service Agreements", icon: "📋" },
      { title: "Volunteer Policies", icon: "📜" },
      { title: "Accountability Structures", icon: "🏗️" },
      { title: "Performance Tracking", icon: "📊" },
    ],
  },
  values: [
    {
      title: "Community First",
      description:
        "Every decision we make is guided by the needs of the communities we serve.",
    },
    {
      title: "Purposeful Matching",
      description:
        "We align volunteer skills with organizational needs to maximize real-world impact.",
    },
    {
      title: "Continuous Growth",
      description:
        "We invest in volunteers and partners through training, support, and recognition.",
    },
    {
      title: "Transparency",
      description:
        "We operate with openness and accountability in everything we do.",
    },
    {
      title: "Inclusivity",
      description:
        "We welcome volunteers and partners from all backgrounds, cultures, and walks of life.",
    },
    {
      title: "Measurable Impact",
      description:
        "We track outcomes — not just effort — to ensure our work creates lasting change.",
    },
  ],
};

// --- Helper: strip MongoDB _id from returned documents ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stripId<T>(doc: any): T {
  if (doc && typeof doc === "object" && "_id" in doc) {
    const { _id, ...rest } = doc;
    return rest as T;
  }
  return doc as T;
}

// --- Singleton content (hero, cta, about) ---

async function getSingletonContent<T>(
  collection: string,
  defaultData: T
): Promise<T> {
  const db = await getDb();
  const doc = await db.collection(collection).findOne({ _key: "singleton" });

  if (!doc) {
    // Seed with default data
    await db
      .collection(collection)
      .insertOne({ _key: "singleton", ...defaultData });
    return defaultData;
  }

  const { _id, _key, ...content } = doc;
  return content as T;
}

async function updateSingletonContent<T extends object>(
  collection: string,
  data: T
): Promise<void> {
  const db = await getDb();
  await db
    .collection(collection)
    .updateOne({ _key: "singleton" }, { $set: data }, { upsert: true });
}

// --- Public read functions ---

export async function getHeroContent(): Promise<HeroContent> {
  return getSingletonContent<HeroContent>(
    COLLECTIONS.hero,
    DEFAULT_HERO_CONTENT
  );
}

export async function getServices(): Promise<ServiceItem[]> {
  const db = await getDb();
  const docs = await db.collection(COLLECTIONS.services).find({}).toArray();

  if (docs.length === 0) {
    // Seed with defaults
    const defaultServices: ServiceItem[] = services.map((s, i) => ({
      ...s,
      id: s.id ?? `service-${i + 1}`,
    }));
    await db.collection(COLLECTIONS.services).insertMany(defaultServices);
    return defaultServices;
  }

  return docs.map((doc) => stripId(doc) as ServiceItem);
}

export async function getStats(): Promise<StatItem[]> {
  const db = await getDb();
  const docs = await db.collection(COLLECTIONS.stats).find({}).toArray();

  if (docs.length === 0) {
    const defaultStats: StatItem[] = stats.map((s, i) => ({
      ...s,
      id: s.id ?? `stat-${i + 1}`,
    }));
    await db.collection(COLLECTIONS.stats).insertMany(defaultStats);
    return defaultStats;
  }

  return docs.map((doc) => stripId(doc) as StatItem);
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const db = await getDb();
  const docs = await db.collection(COLLECTIONS.testimonials).find({}).toArray();

  if (docs.length === 0) {
    const defaultTestimonials: TestimonialItem[] = testimonials.map((t, i) => ({
      ...t,
      id: t.id ?? `testimonial-${i + 1}`,
    }));
    await db
      .collection(COLLECTIONS.testimonials)
      .insertMany(defaultTestimonials);
    return defaultTestimonials;
  }

  return docs.map((doc) => stripId(doc) as TestimonialItem);
}

export async function getBlogPosts(): Promise<BlogPostItem[]> {
  const db = await getDb();
  const docs = await db
    .collection(COLLECTIONS.blog)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  if (docs.length === 0) {
    const now = new Date().toISOString();
    const defaultBlogPosts: BlogPostItem[] = blogPosts.map((p) => ({
      ...p,
      createdAt: p.createdAt ?? now,
      updatedAt: p.updatedAt ?? now,
    }));
    await db.collection(COLLECTIONS.blog).insertMany(defaultBlogPosts);
    return defaultBlogPosts;
  }

  return docs.map((doc) => stripId(doc) as BlogPostItem);
}

export async function getBlogPost(slug: string): Promise<BlogPostItem | null> {
  const db = await getDb();
  const doc = await db.collection(COLLECTIONS.blog).findOne({ slug });

  if (!doc) return null;
  return stripId(doc) as BlogPostItem;
}

export async function getCtaContent(): Promise<CtaContent> {
  return getSingletonContent<CtaContent>(
    COLLECTIONS.cta,
    DEFAULT_CTA_CONTENT
  );
}

export async function getAboutContent(): Promise<AboutContent> {
  return getSingletonContent<AboutContent>(
    COLLECTIONS.about,
    DEFAULT_ABOUT_CONTENT
  );
}

// --- Write functions for admin content management ---

export async function updateHeroContent(data: HeroContent): Promise<void> {
  await updateSingletonContent(COLLECTIONS.hero, data);
}

export async function updateServices(data: ServiceItem[]): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTIONS.services).deleteMany({});
  if (data.length > 0) {
    await db.collection(COLLECTIONS.services).insertMany(data);
  }
}

export async function updateStats(data: StatItem[]): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTIONS.stats).deleteMany({});
  if (data.length > 0) {
    await db.collection(COLLECTIONS.stats).insertMany(data);
  }
}

export async function updateTestimonials(
  data: TestimonialItem[]
): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTIONS.testimonials).deleteMany({});
  if (data.length > 0) {
    await db.collection(COLLECTIONS.testimonials).insertMany(data);
  }
}

export async function createBlogPost(post: BlogPostItem): Promise<void> {
  const db = await getDb();
  await db.collection(COLLECTIONS.blog).insertOne(post);
}

export async function updateBlogPost(
  slug: string,
  data: BlogPostItem
): Promise<void> {
  const db = await getDb();
  const result = await db
    .collection(COLLECTIONS.blog)
    .updateOne({ slug }, { $set: { ...data, slug } });

  if (result.matchedCount === 0) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const db = await getDb();
  const result = await db.collection(COLLECTIONS.blog).deleteOne({ slug });

  if (result.deletedCount === 0) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
}

export async function updateCtaContent(data: CtaContent): Promise<void> {
  await updateSingletonContent(COLLECTIONS.cta, data);
}

export async function updateAboutContent(data: AboutContent): Promise<void> {
  await updateSingletonContent(COLLECTIONS.about, data);
}
