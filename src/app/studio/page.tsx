import PaginationQuery from "@/components/PaginationQuery";
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
      take: 4,
      skip: (pageNumber - 1) * 4,
    }),
    prisma.wallpaper.count({
      where: {
        userId: session.user.id,
      },
    }),
  ]);

  const totalPage = Math.ceil(pageCount / 4);

  return (
    <>
      <section className="grid grid-cols-2 place-items-center gap-4">
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
