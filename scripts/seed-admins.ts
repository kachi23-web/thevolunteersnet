/**
 * One-time migration script: seeds the admins MongoDB collection
 * from content/admins.json.
 *
 * Usage:
 *   node --env-file=.env --import=tsx/esm scripts/seed-admins.ts
 *   OR simply:
 *   npx tsx --env-file=.env scripts/seed-admins.ts
 *
 * Safe to run multiple times — skips users that already exist by username.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { getDb } from "../lib/mongodb";

interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

async function main() {
  const filePath = resolve(process.cwd(), "content", "admins.json");
  const raw = readFileSync(filePath, "utf-8");
  const admins: AdminUser[] = JSON.parse(raw);

  const db = await getDb();
  const collection = db.collection("admins");

  let inserted = 0;
  let skipped = 0;

  for (const admin of admins) {
    const existing = await collection.findOne({ username: admin.username });
    if (existing) {
      console.log(`  skipped: ${admin.username} (already exists)`);
      skipped++;
    } else {
      await collection.insertOne(admin);
      console.log(`  inserted: ${admin.username}`);
      inserted++;
    }
  }

  console.log(`\nDone. ${inserted} inserted, ${skipped} skipped.`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
