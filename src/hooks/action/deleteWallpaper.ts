"use server";

import prisma from "@/lib/prisma";
import s3Client from "@/lib/s3Client";
import { revalidatePath } from "next/cache";

const deleteWallpaper = async (id: string, imageName: string) => {
  //
  try {
    // await rm(`./public/upload/wallpaper/${imageName}`);
    await s3Client.deleteObject({
      Bucket: "wps3",
      Key: imageName,
    });

    await prisma.wallpaper.delete({
      where: {
        id,
      },
    });

    revalidatePath("/studio", "layout");

    return {
      isSuccess: true,
      message: "Deleted Successfully ✌️",
    };
  } catch (error) {
    console.error("Delete wallpaper error:", error);

    return {
      isSuccess: false,
      message: "Deleted Unsuccessfull 🥲",
    };
  }
};

export default deleteWallpaper;
