"use server";

import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

const createWallpaper = async (
	category: string,
	filesContent: File,
	id: string,
) => {
	try {
		const imgArrayBuffer = await filesContent.arrayBuffer();

		const imageName = `${nanoid()}.jpeg`;

		await sharp(imgArrayBuffer)
			.resize({
				width: 240,
				height: 240,
			})
			.jpeg({
				quality: 87,
				mozjpeg: true,
			})
			.toFile(`./public/upload/${imageName}`);

		await prisma.wallpaper.create({
			data: {
				category,
				image: imageName,
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

		return {
			isSuccess: false,
			message: " Internal server error 🥲",
		};
	}
};

export default createWallpaper;
