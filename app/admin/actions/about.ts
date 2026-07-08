"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { aboutSchema } from "@/lib/schemas";
import { updateAboutContent } from "@/lib/content";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export async function updateAboutAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Check session — unauthorized if missing (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse JSON from FormData "about" field
  const rawJson = (formData.get("about") as string) ?? "{}";
  let rawData: unknown;
  try {
    rawData = JSON.parse(rawJson);
  } catch {
    return { success: false, error: "Invalid JSON in about field" };
  }

  // Validate with aboutSchema (Req 3.1, 3.2, 3.9, 3.10)
  const result = aboutSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // Persist and revalidate (Req 4.2)
  await updateAboutContent(result.data);
  revalidatePath("/about");

  return { success: true };
}
