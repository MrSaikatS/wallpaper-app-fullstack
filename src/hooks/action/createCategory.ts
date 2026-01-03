"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "../../../generated/prisma/client";

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
			message: "Category created Successfully 👍",
		};
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2002"
		) {
			return {
				isSuccess: false,
				message: "A category with this name already exists 🔄",
			};
		}

		return {
			isSuccess: false,
			message: "Category create failed 😢",
		};
	}
};

export default createCategory;
