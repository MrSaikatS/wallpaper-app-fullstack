import PaginationQuery from "@/components/PaginationQuery";
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

type PageProps = {
	searchParams: Promise<{
		page: string;
	}>;
};

const page = async ({ searchParams }: PageProps) => {
	const { page } = await searchParams;
	const pageNumber = Number(page) || 1;

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/auth/login");
	}

	const userWallpapers = await prisma.wallpaper.findMany({
		where: {
			userId: session.user.id,
		},
		include: {
			user: true,
		},
		take: 4,
		skip: (pageNumber - 1) * 4,
	});

	const pageCount = await prisma.wallpaper.count({
		where: {
			userId: session.user.id,
		},
	});
	const totalPage = Math.ceil(Number(pageCount) / 4);

	return (
		<>
			<section className="grid grid-cols-2 place-items-center gap-4">
				{userWallpapers.map((data) => (
					<WallpaperCard
						wallpaper={data}
						key={data.id}
					/>
				))}
			</section>

			<div className="my-10 grid place-items-center">
				<PaginationQuery
					key={pageNumber}
					totalPage={totalPage}
					pageNumber={pageNumber}
				/>
			</div>
		</>
	);
};

export default page;
