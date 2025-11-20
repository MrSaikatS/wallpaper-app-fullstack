import WallpaperForm from "@/components/Forms/WallpaperForm";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create | Wallpaper App",
	description: "Create page of Wallpaper App",
};
const page = () => {
	return (
		<section className="grid h-[90dvh] place-items-center">
			<Card className="">
				<CardHeader className="">
					<CardTitle className="text-center text-3xl font-semibold">
						Create Wallpaper
					</CardTitle>
				</CardHeader>
				<CardContent>
					<WallpaperForm />
				</CardContent>
			</Card>
		</section>
	);
};

export default page;
