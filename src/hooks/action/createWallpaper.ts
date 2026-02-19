"use server";

import prisma from "@/lib/prisma";
import s3Client from "@/lib/s3Client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";
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
			Bucket: "wps3",
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
		console.log(error);

		await rm(`./public/upload/wallpaper/${imageName}`);

		return {
			isSuccess: false,
			message: " Internal server error 🥲",
		};
	}
};

export default createWallpaper;
