import s3Client from "@/lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const image = searchParams.get("image");

  if (!image) {
    return NextResponse.json(
      { error: "Image parameter required" },
      { status: 400 },
    );
  }

  try {
    const command = new GetObjectCommand({
      Bucket: "wps3",
      Key: image,
      ResponseContentDisposition: `attachment; filename="${image}"`,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 5, // 5 minutes
    });

    return NextResponse.redirect(presignedUrl);
  } catch (error) {
    console.error("Presigned URL generation failed:", error);

    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 },
    );
  }
}
