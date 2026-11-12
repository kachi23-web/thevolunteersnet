"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { heroSchema } from "@/lib/schemas";
import { updateHeroContent } from "@/lib/content";

export type ActionState = {
  success: boolean;
  error?: string | Record<string, string[]>;
};

export async function updateHeroAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  // Parse extra slides from serialised JSON string submitted by the form
  let extraSlides: unknown = undefined;
  const extraSlidesRaw = formData.get("extraSlides") as string | null;
  if (extraSlidesRaw) {
    try {
      extraSlides = JSON.parse(extraSlidesRaw);
    } catch {
      return { success: false, error: "Invalid extra slides data." };
    }
  }

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
    extraSlides,
  };

  const result = heroSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  await updateHeroContent(result.data);
  revalidatePath("/");

  return { success: true };
}
