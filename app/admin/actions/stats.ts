"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { statsSchema } from "@/lib/schemas";
import { updateStats } from "@/lib/content";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export async function updateStatsAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse JSON from FormData "stats" field (Req 3.1, 3.2)
  const rawJson = (formData.get("stats") as string) ?? "[]";
  let rawData: unknown;
  try {
    rawData = JSON.parse(rawJson);
  } catch {
    return { success: false, error: "Invalid JSON in stats field" };
  }

  // Validate with statsSchema — enforces min 1, max 4 (Req 3.5, 3.10)
  const result = statsSchema.safeParse(rawData);
  if (!result.success) {
    const flattened = result.error.flatten();
    const errors = flattened.formErrors.length > 0
      ? flattened.formErrors.join("; ")
      : result.error.issues.map((e) => `${String(e.path.join("."))}: ${e.message}`).join("; ");
    return { success: false, error: errors };
  }

  // Persist validated stats (Req 4.2)
  await updateStats(result.data);

  // Revalidate home page to reflect updated stats
  revalidatePath("/");

  return { success: true };
}
