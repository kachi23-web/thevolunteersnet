"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { heroSchema } from "@/lib/schemas";
import { updateHeroContent, getHeroContent } from "@/lib/content";
import type { HeroContent } from "@/types";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export async function updateHeroAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Verify session (Req 7.4)
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse form fields and construct the nested shape expected by heroSchema
  const rawData = {
    badge: (formData.get("badge") as string) ?? "",
    headingLine1: (formData.get("headingLine1") as string) ?? "",
    headingHighlight: (formData.get("headingHighlight") as string) ?? "",
    headingLine2: (formData.get("headingLine2") as string) ?? "",
    description: (formData.get("description") as string) ?? "",
    primaryCta: {
      label: (formData.get("primaryCtaLabel") as string) ?? "",
      href: (formData.get("primaryCtaHref") as string) ?? "",
    },
    secondaryCta: {
      label: (formData.get("secondaryCtaLabel") as string) ?? "",
      href: (formData.get("secondaryCtaHref") as string) ?? "",
    },
    heroImage: (formData.get("heroImage") as string) ?? "",
  };

  // Validate using Zod (Req 3.2)
  const result = heroSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  // Write validated content (Req 3.3)
  await updateHeroContent(result.data);

  // Revalidate homepage (Req 3.1)
  revalidatePath("/");

  return { success: true };
}
