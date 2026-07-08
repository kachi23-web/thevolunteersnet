"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { generateSlug, resolveUniqueSlug } from "@/lib/utils";
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/content";
import type { BlogPostItem } from "@/types";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

// Validation schema for blog post form fields
const blogFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(30, "Category must be at most 30 characters"),
  image: z
    .string()
    .min(1, "Image URL is required")
    .refine(
      (val) => val.startsWith("https://"),
      "Image URL must start with 'https://'"
    ),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(200, "Excerpt must be at most 200 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .max(10000, "Body must be at most 10000 characters"),
});

export async function createBlogPostAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse form fields
  const rawData = {
    title: formData.get("title") as string ?? "",
    category: formData.get("category") as string ?? "",
    image: formData.get("image") as string ?? "",
    excerpt: formData.get("excerpt") as string ?? "",
    body: formData.get("body") as string ?? "",
  };

  // Validate using Zod
  const result = blogFormSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // Generate slug from title (Req 5.1, 5.4)
  const baseSlug = generateSlug(result.data.title);
  if (!baseSlug) {
    return { success: false, error: "Unable to generate slug from title" };
  }

  // Resolve unique slug (Req 5.5)
  const existingPosts = await getBlogPosts();
  const existingSlugs = existingPosts.map((p) => p.slug);
  const slug = await resolveUniqueSlug(baseSlug, existingSlugs);

  // Set timestamps (Req 5.1)
  const now = new Date().toISOString();

  // Construct full BlogPostItem
  const newPost: BlogPostItem = {
    slug,
    title: result.data.title,
    category: result.data.category,
    image: result.data.image,
    excerpt: result.data.excerpt,
    body: result.data.body,
    createdAt: now,
    updatedAt: now,
  };

  // Write to content store
  await createBlogPost(newPost);

  // Revalidate blog listing path
  revalidatePath("/blog");

  return { success: true };
}

export async function updateBlogPostAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse form fields (slug is a hidden field)
  const slug = (formData.get("slug") as string) ?? "";
  const rawData = {
    title: formData.get("title") as string ?? "",
    category: formData.get("category") as string ?? "",
    image: formData.get("image") as string ?? "",
    excerpt: formData.get("excerpt") as string ?? "",
    body: formData.get("body") as string ?? "",
  };

  // Validate fields
  const result = blogFormSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // Find existing post by slug (Req 5.6)
  const existingPosts = await getBlogPosts();
  const existingPost = existingPosts.find((p) => p.slug === slug);
  if (!existingPost) {
    return { success: false, error: "Post not found" };
  }

  // Preserve original createdAt and slug, update updatedAt (Req 5.2)
  const updatedPost: BlogPostItem = {
    slug: existingPost.slug,
    title: result.data.title,
    category: result.data.category,
    image: result.data.image,
    excerpt: result.data.excerpt,
    body: result.data.body,
    createdAt: existingPost.createdAt,
    updatedAt: new Date().toISOString(),
  };

  // Write updated post
  await updateBlogPost(slug, updatedPost);

  // Revalidate blog paths (Req 5.2)
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return { success: true };
}

export async function deleteBlogPostAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Get slug from form data
  const slug = (formData.get("slug") as string) ?? "";

  // Attempt delete — returns error if post not found (Req 5.3, 5.6)
  try {
    await deleteBlogPost(slug);
  } catch {
    return { success: false, error: "Post not found" };
  }

  // Revalidate blog paths (Req 5.3)
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return { success: true };
}
