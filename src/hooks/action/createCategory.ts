"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const createCategory = async (category: string) => {
	try {
		const newSlug = category
			.trim()
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-z0-9\s-]/g, " ")
			.replace(/[\s-]+/g, "-")
			.replace(/^-+|-+$/g, "");

		await prisma.category.create({
			data: {
				name: category,
				slug: newSlug,
			},
		});

		revalidatePath("/studio/create");

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
