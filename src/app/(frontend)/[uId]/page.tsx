import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/prisma";

type ProfilePageProps = {
	params: Promise<{ uId: string }>;
};

const page = async ({ params }: ProfilePageProps) => {
	const { uId } = await params;

	const userWallpapers = await prisma.wallpaper.findMany({
		where: {
			userId: uId,
		},
		include: {
			user: true,
			category: true,
		},
	});

	return (
		<section className="grid grid-cols-2 place-items-center gap-4">
			{userWallpapers?.map((data) => (
				<WallpaperCard
					key={data.id}
					wallpaper={data}
				/>
			))}
		</section>
	);
};

export default page;
