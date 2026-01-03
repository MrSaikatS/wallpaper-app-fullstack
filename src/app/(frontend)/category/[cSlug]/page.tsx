import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/prisma";

type CategoryPageProps = {
	params: Promise<{ cSlug: string }>;
};

export const generateMetadata = async ({ params }: CategoryPageProps) => {
	const { cSlug } = await params;

	const { name } = await prisma.category.findUniqueOrThrow({
		where: {
			slug: cSlug,
		},
		select: {
			name: true,
		},
	});

	return {
		title: `${name}  Wallpapers | Wallpaper App`,
		description: `${name} Wallpapers page of Wallpaper App`,
	};
};

const page = async ({ params }: CategoryPageProps) => {
	const { cSlug } = await params;

	const categoryWallpapers = await prisma.wallpaper.findMany({
		where: {
			category: {
				slug: cSlug,
			},
		},
		include: {
			user: true,
			category: true,
		},
	});
	return (
		<section className="grid grid-cols-2 place-items-center gap-4">
			{categoryWallpapers?.map((data) => (
				<WallpaperCard
					key={data.id}
					wallpaper={data}
				/>
			))}
		</section>
	);
};

export default page;
