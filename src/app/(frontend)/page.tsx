import PaginationQuery from "@/components/PaginationQuery";
import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Discover beautiful public wallpapers on Wallpaper App",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const PAGE_SIZE = 4;

const Page = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const [allWallpapers, pageCount] = await Promise.all([
    prisma.wallpaper.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        category: true,
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (pageNumber - 1) * PAGE_SIZE,
    }),
    prisma.wallpaper.count(),
  ]);

  const totalPage = Math.ceil(pageCount / PAGE_SIZE);

  return (
    <>
      <section className="grid place-items-center gap-4 md:grid-cols-2">
        {allWallpapers.length === 0 ?
          <p className="col-span-full text-center text-gray-500">
            No wallpapers found 🙂
          </p>
        : allWallpapers.map((data) => (
            <WallpaperCard
              key={data.id}
              wallpaper={data}
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
