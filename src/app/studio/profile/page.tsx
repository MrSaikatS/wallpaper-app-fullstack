import AvatarForm from "@/components/Forms/AvatarForm";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile | Wallpaper App",
	description: "Profile page of Wallpaper App",
};

const page = () => {
	return (
		<section className="flex h-[80dvh] flex-col items-center justify-center gap-4">
			<Card className="w-sm">
				<CardHeader className="">
					<CardTitle className="text-center text-3xl font-semibold">
						Profile Picture
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AvatarForm />
				</CardContent>
			</Card>

			<Card className="w-sm">
				<CardHeader className="">
					<CardTitle className="text-center text-3xl font-semibold">
						Profile Details
					</CardTitle>
				</CardHeader>
				<CardContent>{/* <ProfileFormWrapper /> */}</CardContent>
			</Card>
		</section>
	);
};

export default page;
