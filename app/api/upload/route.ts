import { NextRequest, NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/cloudfare-r2";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;

    const result = await uploadToR2(file, fileName);

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to upload file to R2" },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
