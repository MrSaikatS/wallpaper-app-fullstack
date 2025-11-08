import LoginForm from "@/components/Forms/LoginForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Login | Wallpaper App",
	description: "Login page of Wallpaper App",
};

const page = () => {
	return (
		<section className="grid h-[85dvh] place-items-center">
			<Card className="w-sm">
				<CardHeader className="gap-3">
					<CardTitle className="text-center text-3xl font-semibold">
						Welcome back
					</CardTitle>

					<CardDescription className="text-center text-lg leading-5">
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<LoginForm />
				</CardContent>

				<CardFooter className="justify-center">
					Don&apos;t have an account?
					<Link
						href={"/auth/register"}
						className="mx-1 text-blue-600 underline">
						Create
					</Link>
					now
				</CardFooter>
			</Card>
		</section>
	);
};

export default page;
