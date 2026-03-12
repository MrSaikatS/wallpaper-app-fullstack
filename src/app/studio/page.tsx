import PaginationQuery from "@/components/PaginationQuery";
import WallpaperCard from "@/components/WallpaperCard";
import { auth } from "@/lib/betterAuth/auth";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const PAGE_SIZE = 4;

export const metadata: Metadata = {
  title: "Private Wallpaper | Wallpaper App",
  description: "Private Wallpaper page of Wallpaper App",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth");
  }

  const [userWallpapers, pageCount] = await Promise.all([
    prisma.wallpaper.findMany({
      include: {
        user: true,
        category: true,
      },
      where: {
        userId: session.user.id,
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (pageNumber - 1) * PAGE_SIZE,
    }),
    prisma.wallpaper.count({
      where: {
        userId: session.user.id,
      },
    }),
  ]);

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  return (
    <>
      <section className="grid place-items-center gap-4 md:grid-cols-2">
        {userWallpapers.length === 0 ?
          <p className="col-span-full text-center text-gray-500">
            No wallpapers found 🙂
          </p>
        : userWallpapers.map((data) => (
            <WallpaperCard
              wallpaper={data}
              key={data.id}
            />
          ))
        }
      </section>

      <PaginationQuery
        pageNumber={pageNumber}
        totalPage={totalPage}
      />
    </>
  );
};

export default Page;
