import WallpaperCard from "@/components/WallpaperCard";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Private Wallpaper | Wallpaper App",
	description: "Private Wallpaper page of Wallpaper App",
};

const page = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/auth/login");
	}

	const userWallpapers = await prisma.wallpaper.findMany({
		where: {
			userId: session.user.id,
		},
		include: {
			user: true,
			category: true,
		},
	});

	return (
		<section className="grid grid-cols-2 place-items-center gap-4">
			{userWallpapers.length === 0 ? (
				<p className="col-span-full text-center text-gray-500">
					No wallpapers found 🙂
				</p>
			) : (
				userWallpapers.map((data) => (
					<WallpaperCard
						wallpaper={data}
						key={data.id}
					/>
				))
			)}
		</section>
	);
};

export default page;
