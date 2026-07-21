import { getDb } from "@/lib/mongodb";
import type { VolunteerSubmission, PartnerSubmission } from "@/types";

const VOLUNTEERS_COLLECTION = "volunteers";
const PARTNERS_COLLECTION = "partners";

// --- Volunteer submissions ---

export async function createVolunteerSubmission(
  data: Omit<VolunteerSubmission, "id" | "submittedAt">
): Promise<VolunteerSubmission> {
  const db = await getDb();
  const submission: VolunteerSubmission = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  await db.collection(VOLUNTEERS_COLLECTION).insertOne(submission);
  return submission;
}

export async function getVolunteerSubmissions(): Promise<VolunteerSubmission[]> {
  const db = await getDb();
  const docs = await db
    .collection(VOLUNTEERS_COLLECTION)
    .find({})
    .sort({ submittedAt: -1 })
    .toArray();
  return docs.map(({ _id, ...rest }) => rest) as unknown as VolunteerSubmission[];
}

export async function getVolunteerSubmission(
  id: string
): Promise<VolunteerSubmission | null> {
  const db = await getDb();
  const doc = await db.collection(VOLUNTEERS_COLLECTION).findOne({ id });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return rest as unknown as VolunteerSubmission;
}

// --- Partner submissions ---

export async function createPartnerSubmission(
  data: Omit<PartnerSubmission, "id" | "submittedAt">
): Promise<PartnerSubmission> {
  const db = await getDb();
  const submission: PartnerSubmission = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
  await db.collection(PARTNERS_COLLECTION).insertOne(submission);
  return submission;
}

export async function getPartnerSubmissions(): Promise<PartnerSubmission[]> {
  const db = await getDb();
  const docs = await db
    .collection(PARTNERS_COLLECTION)
    .find({})
    .sort({ submittedAt: -1 })
    .toArray();
  return docs.map(({ _id, ...rest }) => rest) as unknown as PartnerSubmission[];
}

export async function getPartnerSubmission(
  id: string
): Promise<PartnerSubmission | null> {
  const db = await getDb();
  const doc = await db.collection(PARTNERS_COLLECTION).findOne({ id });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return rest as unknown as PartnerSubmission;
}
