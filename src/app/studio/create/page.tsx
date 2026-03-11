import CreateCategoryForm from "@/components/Forms/CreateCategoryForm";
import WallpaperForm from "@/components/Forms/WallpaperForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create | Wallpaper App",
  description: "Create page of Wallpaper App",
};

export const dynamic = "force-dynamic";

const Page = async () => {
  const allCategory = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <section className="grid place-items-center">
      <Card className="w-full sm:w-sm md:w-md xl:w-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
            Create Wallpaper
          </CardTitle>
        </CardHeader>

        <CardContent>
          <WallpaperForm categoryArray={allCategory} />
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-2 text-sm font-light sm:text-lg md:text-xl">
          Missing a category?
          <CreateCategoryForm />
        </CardFooter>
      </Card>
    </section>
  );
};

export default Page;
