import PaginationQuery from "@/components/PaginationQuery";
import WallpaperCard from "@/components/WallpaperCard";
import getWallpapers from "@/hooks/action/getWallpapers";
import { auth } from "@/lib/betterAuth/auth";
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
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/auth/login");
	}

	const { page } = await searchParams;

	const pageNumber = Number(page) > 0 ? Number(page) : 1;

	const { userWallpapers, totalPages } = await getWallpapers(pageNumber);

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
				<PaginationQuery Pages={totalPages} />
			</div>
		</>
	);
};

export default page;
