"use server";

import { serverEnv } from "@/lib/env/serverEnv";
import prisma from "@/lib/prisma";
import s3Client from "@/lib/s3Client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

const createWallpaper = async (
  category: string,
  filesContent: File,
  id: string,
) => {
  const imageName = `${nanoid()}.jpeg`;

  try {
    const imgArrayBuffer = await filesContent.arrayBuffer();

    const optimizedImageFile = await sharp(imgArrayBuffer)
      .resize({
        width: 640,
        height: 360,
      })
      .jpeg({
        quality: 87,
        mozjpeg: true,
      })
      // .toFile(`./public/upload/wallpaper/${imageName}`);
      .toBuffer();

    await s3Client.putObject({
      Bucket: serverEnv.SPACES_BUCKET_NAME,
      Key: imageName,
      Body: optimizedImageFile,
      ContentType: "image/jpeg",
      ACL: "public-read",
    });

    await prisma.wallpaper.create({
      data: {
        image: imageName,
        categoryId: category,
        userId: id,
      },
    });

    revalidatePath("/", "layout");

    return {
      isSuccess: true,
      message: "Wallpaper Uploaded ✌️",
    };
  } catch (error) {
    console.error("Create wallpaper error:", error);

    // Clean up uploaded S3 object if database creation failed
    try {
      await s3Client.deleteObject({
        Bucket: serverEnv.SPACES_BUCKET_NAME,
        Key: imageName,
      });
    } catch (deleteError) {
      console.error("Failed to delete S3 object:", deleteError);
    }

    // await rm(`./public/upload/wallpaper/${imageName}`);

    return {
      isSuccess: false,
      message: "Internal server error 🥲",
    };
  }
};

export default createWallpaper;
