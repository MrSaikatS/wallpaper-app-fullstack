import AvatarForm from "@/components/Forms/AvatarForm";
import ProfileForm from "@/components/Forms/ProfileForm";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";
import { auth } from "@/lib/betterAuth/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Profile | Wallpaper App",
	description: "Profile page of Wallpaper App",
};

const page = async () => {
	const userDetails = await auth.api.getSession({
		headers: await headers(),
	});

	if (userDetails === null) {
		return redirect("/auth/login");
	}

	const { user } = userDetails;

	return (
		<section className="flex h-[80dvh] flex-col items-center justify-center gap-4">
			<Card className="w-sm">
				<CardHeader className="">
					<CardTitle className="text-center text-3xl font-semibold">
						Profile Picture
					</CardTitle>
				</CardHeader>

				<CardContent>
					<AvatarForm imgId={user.image} />
				</CardContent>
			</Card>

			<Card className="w-sm">
				<CardHeader className="">
					<CardTitle className="text-center text-3xl font-semibold">
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

export default page;
