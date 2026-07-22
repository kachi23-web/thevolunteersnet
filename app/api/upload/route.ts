import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getDb } from "@/lib/mongodb";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    // Auth check using JWT token directly from the request
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB" },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const ext =
      file.name.substring(file.name.lastIndexOf(".")) ||
      `.${file.type.split("/")[1]}`;
    const timestamp = Date.now();
    const safeName = file.name
      .replace(ext, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();
    const filename = `${safeName}-${timestamp}${ext}`;

    // Read file data and convert to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Store in MongoDB
    const db = await getDb();
    await db.collection("uploads").insertOne({
      filename,
      contentType: file.type,
      size: file.size,
      data: base64,
      createdAt: new Date(),
    });

    // Return the URL that serves from our image API route
    const publicPath = `/api/images/${filename}`;
    return NextResponse.json({ path: publicPath });
  } catch (error) {
    console.error("Upload error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
