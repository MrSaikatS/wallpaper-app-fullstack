import RegisterForm from "@/components/Forms/RegisterForm";
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
	title: "Nextjs Starter Frontend",
	description: "Production grade Next.js starter template",
};

const page = () => {
	return (
		<section className="grid h-[90dvh] place-items-center">
			<Card className="w-sm">
				<CardHeader className="gap-3">
					<CardTitle className="text-center text-3xl font-semibold">
						Create Account
					</CardTitle>

					<CardDescription className="text-center text-lg leading-5">
						Enter your details below to register your account.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<RegisterForm />
				</CardContent>

				<CardFooter className="justify-center">
					Already have an account?
					<Link
						href={"/auth/login"}
						className="mx-1 text-blue-600 underline">
						Login
					</Link>
					now
				</CardFooter>
			</Card>
		</section>
	);
};

export default page;
