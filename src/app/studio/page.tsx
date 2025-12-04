import WallpaperCard from "@/components/WallpaperCard";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Nextjs Starter Frontend",
	description: "Production grade Next.js starter template",
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
	});

	return (
		<section className="grid grid-cols-2 place-items-center gap-4">
			{userWallpapers.map((data) => (
				<WallpaperCard
					wallpaper={data}
					key={data.id}
				/>
			))}
		</section>
	);
};

export default page;
