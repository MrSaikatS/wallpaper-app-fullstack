"use server";

import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const getWallpapers = async (page: number) => {
	const pageNumber = Number(page);

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const userWallpapers = await prisma.wallpaper.findMany({
		where: {
			userId: session?.user.id,
		},
		include: {
			user: true,
		},
		take: 4,
		skip: (pageNumber - 1) * 4,
	});
	const pageCount = await prisma.wallpaper.count();
	const totalPages = Math.ceil(Number(pageCount) / 4);

	return { userWallpapers, totalPages };
};

export default getWallpapers;
