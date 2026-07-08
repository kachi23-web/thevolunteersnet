import { z } from "zod";
import { icons } from "lucide-react";

// --- Shared validators ---

/** Href must start with `/` or `https://`, max 2048 chars */
const hrefSchema = z
  .string()
  .min(1, "Link is required")
  .max(2048, "Link must be at most 2048 characters")
  .refine(
    (val) => val.startsWith("/") || val.startsWith("https://"),
    "Link must start with '/' or 'https://'"
  );

/** Non-empty trimmed string (rejects whitespace-only) */
function nonEmptyString(maxLength: number, fieldName: string) {
  return z
    .string()
    .min(1, `${fieldName} is required`)
    .max(maxLength, `${fieldName} must be at most ${maxLength} characters`)
    .refine(
      (val) => val.trim().length > 0,
      `${fieldName} cannot be empty or whitespace only`
    );
}

/** Validates that icon name exists in lucide-react icons export */
const iconSchema = z
  .string()
  .min(1, "Icon is required")
  .refine(
    (val) => val in icons,
    "Icon must be a valid Lucide icon name"
  );

/** CTA button schema (label + href) */
const ctaButtonSchema = z.object({
  label: nonEmptyString(40, "Label"),
  href: hrefSchema,
});

// --- Hero Schema ---

export const heroSchema = z.object({
  badge: nonEmptyString(60, "Badge"),
  headingLine1: nonEmptyString(40, "Heading line 1"),
  headingHighlight: nonEmptyString(40, "Heading highlight"),
  headingLine2: nonEmptyString(40, "Heading line 2"),
  description: nonEmptyString(300, "Description"),
  primaryCta: ctaButtonSchema,
  secondaryCta: ctaButtonSchema,
  heroImage: z.string().min(1, "Hero image is required"),
});

// --- Service Schema ---

export const serviceItemSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: nonEmptyString(50, "Title"),
  description: nonEmptyString(200, "Description"),
  icon: iconSchema,
  expanded: z.string().optional(),
});

export const servicesSchema = z
  .array(serviceItemSchema)
  .min(1, "At least 1 service is required")
  .max(6, "Maximum 6 services allowed");

// --- Stat Schema ---

export const statItemSchema = z.object({
  id: z.string().min(1, "ID is required"),
  value: nonEmptyString(10, "Value"),
  label: nonEmptyString(30, "Label"),
});

export const statsSchema = z
  .array(statItemSchema)
  .min(1, "At least 1 stat is required")
  .max(4, "Maximum 4 stats allowed");

// --- Testimonial Schema ---

export const testimonialItemSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: nonEmptyString(50, "Name"),
  role: nonEmptyString(60, "Role"),
  quote: nonEmptyString(300, "Quote"),
});

export const testimonialsSchema = z
  .array(testimonialItemSchema)
  .min(1, "At least 1 testimonial is required")
  .max(6, "Maximum 6 testimonials allowed");

// --- Blog Post Schema ---

const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(100, "Slug must be at most 100 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must contain only lowercase letters, digits, and hyphens"
  );

export const blogPostItemSchema = z.object({
  slug: slugSchema,
  title: nonEmptyString(100, "Title"),
  category: nonEmptyString(30, "Category"),
  image: z
    .string()
    .min(1, "Image URL is required")
    .refine(
      (val) => val.startsWith("https://"),
      "Image URL must start with 'https://'"
    ),
  excerpt: nonEmptyString(200, "Excerpt"),
  body: nonEmptyString(10000, "Body"),
  createdAt: z.string().min(1, "Created date is required"),
  updatedAt: z.string().min(1, "Updated date is required"),
});

export const blogPostsSchema = z.array(blogPostItemSchema);

// --- CTA Schema ---

export const ctaSchema = z.object({
  heading: nonEmptyString(60, "Heading"),
  description: nonEmptyString(200, "Description"),
  primaryCta: ctaButtonSchema,
  secondaryCta: ctaButtonSchema,
});

// --- About Schema ---

const approachItemSchema = z.object({
  title: nonEmptyString(50, "Title"),
  icon: iconSchema,
});

const valueItemSchema = z.object({
  title: nonEmptyString(30, "Title"),
  description: nonEmptyString(150, "Description"),
});

export const aboutSchema = z.object({
  hero: z.object({
    badge: nonEmptyString(60, "Badge"),
    headingLine1: nonEmptyString(40, "Heading line 1"),
    headingHighlight: nonEmptyString(40, "Heading highlight"),
    description: nonEmptyString(300, "Description"),
    heroImage: z.string().min(1, "Hero image is required"),
  }),
  mission: nonEmptyString(300, "Mission"),
  vision: nonEmptyString(300, "Vision"),
  approach: z.object({
    description: nonEmptyString(300, "Approach description"),
    items: z
      .array(approachItemSchema)
      .max(4, "Maximum 4 approach items allowed"),
  }),
  values: z
    .array(valueItemSchema)
    .min(1, "At least 1 value is required")
    .max(6, "Maximum 6 values allowed"),
});
