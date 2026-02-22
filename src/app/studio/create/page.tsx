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
import { Metadata } from "next";

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
    <section className="grid h-[90dvh] place-items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold">
            Create Wallpaper
          </CardTitle>
        </CardHeader>

        <CardContent>
          <WallpaperForm categoryArray={allCategory} />
        </CardContent>

        <CardFooter className="flex items-center justify-center gap-2 text-xl font-light">
          Missing a category?
          <CreateCategoryForm />
        </CardFooter>
      </Card>
    </section>
  );
};

export default Page;
