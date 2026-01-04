import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Public Wallpaper | Wallpaper App",
	description: "Public Wallpaper page of Wallpaper App",
};

const page = async () => {
	const allWallpapers = await prisma.wallpaper.findMany({
		include: {
			user: true,
			category: true,
		},
	});

	return (
		<section className="grid grid-cols-2 place-items-center gap-4">
			{allWallpapers.map((data) => (
				<WallpaperCard
					key={data.id}
					wallpaper={data}
				/>
			))}
		</section>
	);
};

export default page;
