"use server";

import { auth } from "@/lib/betterAuth/auth";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { rm } from "node:fs/promises";
import sharp from "sharp";
import authUserServer from "./authUserServer";

const updateAvatar = async (imgFile: File, abc: string) => {
	console.log(abc);

	try {
		const { image } = await authUserServer();

		if (image !== "avatar.png") {
			await rm(`./public/upload/${image}`);
		}

		const imgArrayBuffer = await imgFile.arrayBuffer();

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

		await auth.api.updateUser({
			body: {
				image: imageName,
			},
			headers: await headers(),
		});

		revalidatePath("/", "layout");

		return {
			isSuccess: true,
			message: "Image uploaded ✌️",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "Image not uploaded 🥲",
		};
	}
};

export default updateAvatar;
