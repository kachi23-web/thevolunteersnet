"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { ctaSchema } from "@/lib/schemas";
import { updateCtaContent } from "@/lib/content";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export async function updateCtaAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse form data fields and construct nested object (Req 3.1, 3.2)
  const rawData = {
    heading: (formData.get("heading") as string) ?? "",
    description: (formData.get("description") as string) ?? "",
    primaryCta: {
      label: (formData.get("primaryCtaLabel") as string) ?? "",
      href: (formData.get("primaryCtaHref") as string) ?? "",
    },
    secondaryCta: {
      label: (formData.get("secondaryCtaLabel") as string) ?? "",
      href: (formData.get("secondaryCtaHref") as string) ?? "",
    },
  };

  // Validate with ctaSchema (Req 3.8)
  const result = ctaSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // Persist and revalidate (Req 4.2)
  await updateCtaContent(result.data);
  revalidatePath("/");

  return { success: true };
}
