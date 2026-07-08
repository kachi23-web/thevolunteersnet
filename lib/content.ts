import path from "path";
import { mkdir, readFile, writeFile, rename, unlink, access } from "fs/promises";
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

// --- Hardcoded content filename constants ---
// These are NEVER user-supplied to prevent path traversal attacks (Req 7.1)
export const CONTENT_FILES = {
  hero: "hero.json",
  services: "services.json",
  stats: "stats.json",
  testimonials: "testimonials.json",
  blog: "blog.json",
  cta: "cta.json",
  about: "about.json",
} as const;

export type ContentSection = keyof typeof CONTENT_FILES;

// Absolute path to the content directory
export const CONTENT_DIR = path.resolve(process.cwd(), "content");

/**
 * Ensures the `content/` directory exists, creating it if missing.
 * Called before any read or write operation. (Req 4.4)
 */
export async function ensureContentDir(): Promise<void> {
  await mkdir(CONTENT_DIR, { recursive: true });
}

/**
 * Resolves a content filename to an absolute path and verifies it resides
 * within the content directory. Rejects any path that escapes the
 * `content/` directory boundary. (Req 7.2, 7.3)
 *
 * @param filename - One of the hardcoded content filenames
 * @returns The resolved absolute file path
 * @throws Error if the resolved path escapes the content directory
 */
export function resolveContentPath(filename: string): string {
  const resolved = path.resolve(CONTENT_DIR, filename);

  // Verify the resolved path starts with the content directory path
  // Use path.sep to ensure we match the full directory boundary
  // (prevents matching "content-extra/" when checking for "content/")
  if (!resolved.startsWith(CONTENT_DIR + path.sep) && resolved !== CONTENT_DIR) {
    throw new Error("Invalid content path: path escapes content directory");
  }

  return resolved;
}

/**
 * Gets the safe absolute path for a known content section file.
 * Combines the hardcoded filename lookup with path security verification.
 *
 * @param section - The content section key
 * @returns The resolved absolute file path for the section's JSON file
 * @throws Error if path resolution fails security check
 */
export function getContentFilePath(section: ContentSection): string {
  const filename = CONTENT_FILES[section];
  return resolveContentPath(filename);
}

/**
 * Atomically writes content data to a JSON file in the content directory.
 * Writes to a temporary file first, then renames to the target path to
 * ensure no partial writes occur. Cleans up the temp file on failure.
 * (Req 4.1, 4.3, 4.4, 4.5)
 *
 * @param filename - The content filename to write to
 * @param data - The data to serialize as JSON
 * @throws Error if the write operation fails (after cleanup)
 */
export async function writeContentFile<T>(filename: string, data: T): Promise<void> {
  await ensureContentDir();

  const filePath = resolveContentPath(filename);
  const tempPath = `${filePath}.tmp`;

  try {
    await writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
    await rename(tempPath, filePath);
  } catch (error) {
    // Attempt to clean up temp file; ignore error if it doesn't exist
    try {
      await unlink(tempPath);
    } catch {
      // Temp file may not exist if writeFile failed before creating it
    }
    throw error;
  }
}


/**
 * Reads and parses a JSON content file, returning typed data.
 * If the file doesn't exist, seeds it with default data and returns defaults.
 * If JSON is malformed or the parsed array is empty, returns default data.
 * (Req 2.1, 2.2, 2.3, 2.4, 2.5)
 *
 * @param filename - One of the hardcoded content filenames
 * @param defaultData - Default seed data to use when file is missing, malformed, or empty
 * @returns Parsed content data of type T
 */
export async function readContentFile<T>(filename: string, defaultData: T): Promise<T> {
  await ensureContentDir();

  const filePath = resolveContentPath(filename);

  // Check if file exists
  try {
    await access(filePath);
  } catch {
    // File doesn't exist — seed with default data and return defaults
    await writeFile(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }

  // File exists — read and parse
  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch {
    // Read failure — return defaults
    console.error(`Failed to read content file: ${filePath}`);
    return defaultData;
  }

  let parsed: T;
  try {
    parsed = JSON.parse(raw) as T;
  } catch (err) {
    // Malformed JSON — log error and return defaults
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Malformed JSON in content file ${filePath}: ${message}`);
    return defaultData;
  }

  // If parsed result is an empty array, return default seed data
  if (Array.isArray(parsed) && parsed.length === 0) {
    return defaultData;
  }

  return parsed;
}


// --- Write functions for admin content management ---

/**
 * Updates the hero section content. (Req 4.1)
 */
export async function updateHeroContent(data: HeroContent): Promise<void> {
  await writeContentFile(CONTENT_FILES.hero, data);
}

/**
 * Updates the services list. (Req 4.1)
 */
export async function updateServices(data: ServiceItem[]): Promise<void> {
  await writeContentFile(CONTENT_FILES.services, data);
}

/**
 * Updates the impact statistics. (Req 4.1)
 */
export async function updateStats(data: StatItem[]): Promise<void> {
  await writeContentFile(CONTENT_FILES.stats, data);
}

/**
 * Updates the testimonials list. (Req 4.1)
 */
export async function updateTestimonials(data: TestimonialItem[]): Promise<void> {
  await writeContentFile(CONTENT_FILES.testimonials, data);
}

/**
 * Creates a new blog post by appending it to the existing posts list. (Req 5.1)
 */
export async function createBlogPost(post: BlogPostItem): Promise<void> {
  const posts = await readContentFile<BlogPostItem[]>(CONTENT_FILES.blog, []);
  posts.push(post);
  await writeContentFile(CONTENT_FILES.blog, posts);
}

/**
 * Updates an existing blog post by slug. Preserves the slug value.
 * Throws an error if the post is not found. (Req 5.2)
 */
export async function updateBlogPost(slug: string, data: BlogPostItem): Promise<void> {
  const posts = await readContentFile<BlogPostItem[]>(CONTENT_FILES.blog, []);
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }

  // Preserve the original slug
  posts[index] = { ...data, slug };
  await writeContentFile(CONTENT_FILES.blog, posts);
}

/**
 * Deletes a blog post by slug.
 * Throws an error if the post is not found. (Req 5.3)
 */
export async function deleteBlogPost(slug: string): Promise<void> {
  const posts = await readContentFile<BlogPostItem[]>(CONTENT_FILES.blog, []);
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }

  const remaining = posts.filter((p) => p.slug !== slug);
  await writeContentFile(CONTENT_FILES.blog, remaining);
}

/**
 * Updates the CTA section content. (Req 4.1)
 */
export async function updateCtaContent(data: CtaContent): Promise<void> {
  await writeContentFile(CONTENT_FILES.cta, data);
}

/**
 * Updates the about page content. (Req 4.1)
 */
export async function updateAboutContent(data: AboutContent): Promise<void> {
  await writeContentFile(CONTENT_FILES.about, data);
}


// --- Default content for sections not in lib/data.ts ---

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

// --- Public read functions ---

/**
 * Returns the hero section content.
 * Falls back to hardcoded defaults matching the current homepage.
 */
export async function getHeroContent(): Promise<HeroContent> {
  return readContentFile<HeroContent>(CONTENT_FILES.hero, DEFAULT_HERO_CONTENT);
}

/**
 * Returns all service items with guaranteed `id` fields.
 * Seeds from the static data in lib/data.ts, adding IDs where missing.
 */
export async function getServices(): Promise<ServiceItem[]> {
  const defaultServices: ServiceItem[] = services.map((s, i) => ({
    ...s,
    id: s.id ?? `service-${i + 1}`,
  }));
  return readContentFile<ServiceItem[]>(CONTENT_FILES.services, defaultServices);
}

/**
 * Returns all stat items with guaranteed `id` fields.
 * Seeds from the static data in lib/data.ts, adding IDs where missing.
 */
export async function getStats(): Promise<StatItem[]> {
  const defaultStats: StatItem[] = stats.map((s, i) => ({
    ...s,
    id: s.id ?? `stat-${i + 1}`,
  }));
  return readContentFile<StatItem[]>(CONTENT_FILES.stats, defaultStats);
}

/**
 * Returns all testimonial items with guaranteed `id` fields.
 * Seeds from the static data in lib/data.ts, adding IDs where missing.
 */
export async function getTestimonials(): Promise<TestimonialItem[]> {
  const defaultTestimonials: TestimonialItem[] = testimonials.map((t, i) => ({
    ...t,
    id: t.id ?? `testimonial-${i + 1}`,
  }));
  return readContentFile<TestimonialItem[]>(
    CONTENT_FILES.testimonials,
    defaultTestimonials
  );
}

/**
 * Returns all blog posts with guaranteed `createdAt` and `updatedAt` fields.
 * Seeds from the static data in lib/data.ts, adding timestamps where missing.
 */
export async function getBlogPosts(): Promise<BlogPostItem[]> {
  const now = new Date().toISOString();
  const defaultBlogPosts: BlogPostItem[] = blogPosts.map((p) => ({
    ...p,
    createdAt: p.createdAt ?? now,
    updatedAt: p.updatedAt ?? now,
  }));
  return readContentFile<BlogPostItem[]>(CONTENT_FILES.blog, defaultBlogPosts);
}

/**
 * Returns a single blog post matching the given slug, or null if not found.
 */
export async function getBlogPost(slug: string): Promise<BlogPostItem | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

/**
 * Returns the CTA section content.
 * Falls back to hardcoded defaults matching the current homepage.
 */
export async function getCtaContent(): Promise<CtaContent> {
  return readContentFile<CtaContent>(CONTENT_FILES.cta, DEFAULT_CTA_CONTENT);
}

/**
 * Returns the about page content.
 * Falls back to hardcoded defaults matching the current about page.
 */
export async function getAboutContent(): Promise<AboutContent> {
  return readContentFile<AboutContent>(CONTENT_FILES.about, DEFAULT_ABOUT_CONTENT);
}
