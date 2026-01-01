"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const createCategory = async (category: string) => {
	try {
		await prisma.category.create({
			data: {
				categoryName: category,
				categorySlug: category.toLowerCase(),
			},
		});

		revalidatePath("/", "layout");

		return {
			isSuccess: true,
			message: "Category created Succesfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "Category create failed 😢",
		};
	}
};

export default createCategory;
