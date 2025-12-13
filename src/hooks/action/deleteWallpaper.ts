"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { rm } from "node:fs/promises";

const deleteWallpaper = async (id: string, imageName: string) => {
	//
	try {
		await rm(`./public/upload/${imageName}`);

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
		console.log(error);

		return {
			isSuccess: false,
			message: "Deleted Unsuccessfull 🥲",
		};
	}
};

export default deleteWallpaper;
