"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { servicesSchema } from "@/lib/schemas";
import { updateServices } from "@/lib/content";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export async function updateServicesAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse JSON from FormData "services" field
  const rawJson = (formData.get("services") as string) ?? "[]";

  let rawData: unknown;
  try {
    rawData = JSON.parse(rawJson);
  } catch {
    return { success: false, error: "Invalid JSON format for services data" };
  }

  // Validate with servicesSchema (Req 3.1, 3.2, 3.4, 3.10)
  const result = servicesSchema.safeParse(rawData);
  if (!result.success) {
    const flattened = result.error.flatten();
    // For array schemas, formErrors holds top-level array errors (min/max),
    // otherwise stringify the full error for field-level feedback.
    const errors = flattened.formErrors.length > 0
      ? flattened.formErrors.join("; ")
      : result.error.issues.map((e) => `${String(e.path.join("."))}: ${e.message}`).join("; ");
    return { success: false, error: errors };
  }

  // Persist validated services (Req 4.2)
  await updateServices(result.data);

  // Revalidate relevant paths
  revalidatePath("/");
  revalidatePath("/services");

  return { success: true };
}
