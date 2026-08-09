/**
 * Updates the admin password hash in the admins MongoDB collection.
 *
 * Usage:
 *   npx tsx --env-file=.env scripts/update-admin-password.ts
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { getDb } from "../lib/mongodb";

async function main() {
  // Read the current hash from admins.json (source of truth before full migration)
  const filePath = resolve(process.cwd(), "content", "admins.json");
  const admins = JSON.parse(readFileSync(filePath, "utf-8")) as Array<{
    username: string;
    passwordHash: string;
  }>;

  const db = await getDb();
  const collection = db.collection("admins");

  for (const admin of admins) {
    const result = await collection.updateOne(
      { username: admin.username },
      { $set: { passwordHash: admin.passwordHash } }
    );
    console.log(
      `  ${admin.username}: matched=${result.matchedCount} modified=${result.modifiedCount}`
    );
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
