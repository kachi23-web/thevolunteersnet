"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { testimonialsSchema } from "@/lib/schemas";
import { updateTestimonials } from "@/lib/content";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export async function updateTestimonialsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse JSON from FormData "testimonials" field (Req 3.1, 3.2)
  let rawData: unknown;
  try {
    const rawJson = (formData.get("testimonials") as string) ?? "[]";
    rawData = JSON.parse(rawJson);
  } catch {
    return { success: false, error: "Invalid JSON in testimonials field" };
  }

  // Validate with testimonialsSchema (min 1, max 6) (Req 3.6, 3.10)
  const result = testimonialsSchema.safeParse(rawData);
  if (!result.success) {
    const flattened = result.error.flatten();
    const errors = flattened.formErrors.length > 0
      ? flattened.formErrors.join("; ")
      : result.error.issues.map((e) => `${String(e.path.join("."))}: ${e.message}`).join("; ");
    return { success: false, error: errors };
  }

  // Persist validated testimonials (Req 4.2)
  await updateTestimonials(result.data);

  // Revalidate homepage path
  revalidatePath("/");

  return { success: true };
}
