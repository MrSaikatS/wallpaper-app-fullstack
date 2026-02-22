import PaginationQuery from "@/components/PaginationQuery";
import WallpaperCard from "@/components/WallpaperCard";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Wallpaper App",
  description: "Discover beautiful public wallpapers on Wallpaper App",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, Math.floor(Number(page) || 1));

  const [allWallpapers, pageCount] = await Promise.all([
    prisma.wallpaper.findMany({
      include: {
        user: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
      take: 4,
      skip: (pageNumber - 1) * 4,
    }),
    prisma.wallpaper.count(),
  ]);

  const totalPage = Math.ceil(pageCount / 4);

  return (
    <>
      <section className="grid grid-cols-2 place-items-center gap-4">
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

      <div className="fixed right-0 bottom-0 left-0">
        <PaginationQuery
          pageNumber={pageNumber}
          totalPage={totalPage}
        />
      </div>
    </>
  );
};

export default Page;
