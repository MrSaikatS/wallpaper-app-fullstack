import AvatarForm from "@/components/Forms/AvatarForm";
import ProfileForm from "@/components/Forms/ProfileForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { auth } from "@/lib/betterAuth/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | Wallpaper App",
  description: "Profile page of Wallpaper App",
};

const Page = async () => {
  const userDetails = await auth.api.getSession({
    headers: await headers(),
  });

  if (userDetails === null) {
    return redirect("/auth");
  }

  const { user } = userDetails;

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Card className="w-full sm:w-sm md:w-md xl:w-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
            Profile Picture
          </CardTitle>
        </CardHeader>

        <CardContent>
          <AvatarForm imgId={user.image} />
        </CardContent>
      </Card>

      <Card className="w-full sm:w-sm md:w-md xl:w-xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
            Profile Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ProfileForm userName={user.name} />
        </CardContent>
      </Card>
    </section>
  );
};

export default Page;
