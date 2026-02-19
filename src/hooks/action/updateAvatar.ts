"use server";

import { auth } from "@/lib/betterAuth/auth";
import s3Client from "@/lib/s3Client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import sharp from "sharp";
import authUserServer from "./authUserServer";

const updateAvatar = async (imgFile: File) => {
	try {
		const { image } = await authUserServer();

		// if (image !== "avatar.png") {
		// 	await rm(`./public/upload/avatar/${image}`);
		// }

		await s3Client.deleteObject({
			Bucket: "wps3",
			Key: image,
		});

		const imgArrayBuffer = await imgFile.arrayBuffer();

		const imageName = `${nanoid()}.jpeg`;

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
			Bucket: "wps3",
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

		revalidatePath("/studio", "layout");

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
