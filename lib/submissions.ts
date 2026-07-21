import { promises as fs } from "fs";
import path from "path";
import type { VolunteerSubmission, PartnerSubmission } from "@/types";

// Store submissions in JSON files in the content directory
const DATA_DIR = path.join(process.cwd(), "content");
const VOLUNTEERS_FILE = path.join(DATA_DIR, "volunteers.json");
const PARTNERS_FILE = path.join(DATA_DIR, "partners.json");

async function readJson<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    // File doesn't exist yet — return empty array
    return [];
  }
}

async function writeJson<T>(filePath: string, data: T[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// --- Volunteer submissions ---

export async function createVolunteerSubmission(
  data: Omit<VolunteerSubmission, "id" | "submittedAt">
): Promise<VolunteerSubmission> {
  const submissions = await readJson<VolunteerSubmission>(VOLUNTEERS_FILE);
  const submission: VolunteerSubmission = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  submissions.unshift(submission);
  await writeJson(VOLUNTEERS_FILE, submissions);
  return submission;
}

export async function getVolunteerSubmissions(): Promise<VolunteerSubmission[]> {
  return readJson<VolunteerSubmission>(VOLUNTEERS_FILE);
}

export async function getVolunteerSubmission(
  id: string
): Promise<VolunteerSubmission | null> {
  const submissions = await readJson<VolunteerSubmission>(VOLUNTEERS_FILE);
  return submissions.find((s) => s.id === id) ?? null;
}

// --- Partner submissions ---

export async function createPartnerSubmission(
  data: Omit<PartnerSubmission, "id" | "submittedAt">
): Promise<PartnerSubmission> {
  const submissions = await readJson<PartnerSubmission>(PARTNERS_FILE);
  const submission: PartnerSubmission = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  submissions.unshift(submission);
  await writeJson(PARTNERS_FILE, submissions);
  return submission;
}

export async function getPartnerSubmissions(): Promise<PartnerSubmission[]> {
  return readJson<PartnerSubmission>(PARTNERS_FILE);
}

export async function getPartnerSubmission(
  id: string
): Promise<PartnerSubmission | null> {
  const submissions = await readJson<PartnerSubmission>(PARTNERS_FILE);
  return submissions.find((s) => s.id === id) ?? null;
}
