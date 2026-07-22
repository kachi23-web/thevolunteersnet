import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    const db = await getDb();
    const image = await db.collection("uploads").findOne({ filename });

    if (!image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Decode base64 back to binary
    const buffer = Buffer.from(image.data, "base64");

    // Return the image with proper headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": image.contentType,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image serve error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
