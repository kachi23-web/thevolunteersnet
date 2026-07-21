"use server";

import {
  createVolunteerSubmission,
  createPartnerSubmission,
} from "@/lib/submissions";
import { revalidatePath } from "next/cache";

interface VolunteerFormData {
  fullName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  motivation: string;
}

interface PartnerFormData {
  organizationName: string;
  contactName: string;
  email: string;
  organizationType: string;
  volunteerNeeds: string;
}

export async function submitVolunteerForm(data: VolunteerFormData) {
  // Server-side validation
  if (!data.fullName?.trim()) return { error: "Full name is required." };
  if (!data.email?.trim()) return { error: "Email address is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    return { error: "Please enter a valid email address." };
  if (!data.phone?.trim()) return { error: "Phone number is required." };
  if (!data.areaOfInterest) return { error: "Please select an area of interest." };
  if (!data.motivation?.trim()) return { error: "Please share your motivation." };

  try {
    await createVolunteerSubmission({
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      areaOfInterest: data.areaOfInterest,
      motivation: data.motivation.trim(),
    });
    revalidatePath("/admin/volunteers");
    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function submitPartnerForm(data: PartnerFormData) {
  // Server-side validation
  if (!data.organizationName?.trim())
    return { error: "Organization name is required." };
  if (!data.contactName?.trim()) return { error: "Contact name is required." };
  if (!data.email?.trim()) return { error: "Email address is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    return { error: "Please enter a valid email address." };
  if (!data.organizationType)
    return { error: "Please select an organization type." };
  if (!data.volunteerNeeds?.trim())
    return { error: "Please describe your volunteer needs." };

  try {
    await createPartnerSubmission({
      organizationName: data.organizationName.trim(),
      contactName: data.contactName.trim(),
      email: data.email.trim(),
      organizationType: data.organizationType,
      volunteerNeeds: data.volunteerNeeds.trim(),
    });
    revalidatePath("/admin/partners");
    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
