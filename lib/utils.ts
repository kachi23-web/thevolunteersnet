/**
 * Generates a URL-safe slug from a title string.
 *
 * The algorithm:
 * 1. Converts to lowercase
 * 2. Removes special characters (keeps letters, digits, spaces, hyphens)
 * 3. Replaces spaces with hyphens
 * 4. Collapses consecutive hyphens
 * 5. Trims leading/trailing hyphens
 * 6. Truncates to max 80 characters
 * 7. Re-trims trailing hyphen after truncation
 *
 * @param title - The input title string
 * @returns A slug matching ^[a-z0-9]([a-z0-9-]*[a-z0-9])?$ or empty string
 */
export function generateSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .replace(/^-|-$/g, "") // trim leading/trailing hyphens
    .slice(0, 80) // truncate to max 80 characters
    .replace(/-$/g, ""); // re-trim trailing hyphen after truncation

  return slug;
}

/**
 * Resolves a unique slug by checking against existing slugs.
 * If the base slug conflicts, appends `-1`, `-2`, ... up to `-100`.
 * Throws if no unique slug can be produced within 100 attempts.
 * (Req 5.5)
 *
 * @param baseSlug - The generated slug to check for uniqueness
 * @param existingSlugs - Array of slugs already in use
 * @returns A unique slug string
 * @throws Error if a unique slug cannot be resolved within 100 attempts
 */
export async function resolveUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): Promise<string> {
  // If the base slug doesn't conflict, return it as-is
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  // Try appending -1, -2, ... up to -100
  for (let i = 1; i <= 100; i++) {
    const candidate = `${baseSlug}-${i}`;
    if (!existingSlugs.includes(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Unable to resolve a unique slug for "${baseSlug}" after 100 attempts`
  );
}
