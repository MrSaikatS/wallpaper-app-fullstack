"use server";

import { auth } from "@/lib/betterAuth/auth";
import { serverEnv } from "@/lib/env/serverEnv";
import s3Client from "@/lib/s3Client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import sharp from "sharp";
import authUserServer from "./authUserServer";

const updateAvatar = async (imgFile: File) => {
  let imageName: string | undefined;

  try {
    const { image: oldImage } = await authUserServer();

    const imgArrayBuffer = await imgFile.arrayBuffer();

    imageName = `${nanoid()}.jpeg`;

    const optimizedImageFile = await sharp(imgArrayBuffer)
      .resize({
        width: 240,
        height: 240,
      })
      .jpeg({
        quality: 87,
        mozjpeg: true,
      })
      // .toFile(`./public/upload/avatar/${imageName}`);
      .toBuffer();

    await s3Client.putObject({
      Bucket: serverEnv.SPACES_BUCKET_NAME,
      Key: imageName,
      Body: optimizedImageFile,
      ContentType: "image/jpeg",
      ACL: "public-read",
    });

    await auth.api.updateUser({
      body: {
        image: imageName,
      },
      headers: await headers(),
    });

    // Delete old image only after successful update
    if (oldImage) {
      await s3Client.deleteObject({
        Bucket: serverEnv.SPACES_BUCKET_NAME,
        Key: oldImage,
      });
    }

    revalidatePath("/studio", "layout");

    return {
      isSuccess: true,
      message: "Image uploaded ✌️",
    };
  } catch (error) {
    console.error("Update avatar error:", error);

    // Clean up newly uploaded image if user update failed
    if (imageName) {
      try {
        await s3Client.deleteObject({
          Bucket: serverEnv.SPACES_BUCKET_NAME,
          Key: imageName,
        });
      } catch (deleteError) {
        console.error("Failed to delete new S3 object:", deleteError);
      }
    }

    return {
      isSuccess: false,
      message: "Image not uploaded 🥲",
    };
  }
};

export default updateAvatar;
