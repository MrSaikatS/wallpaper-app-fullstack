import { Button } from "@/components/shadcnui/button";
import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import Link from "next/link";

const AuthNavLink = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		return (
			<Button
				variant={"outline"}
				size={"sm"}
				asChild>
				<Link href="/studio">Dashboard</Link>
			</Button>
		);
	}

	return (
		<>
			<Button
				variant={"outline"}
				size={"sm"}
				asChild>
				<Link href="/auth/login">Login</Link>
			</Button>

			<Button
				variant={"outline"}
				size={"sm"}
				asChild>
				<Link href="/auth/register">Register</Link>
			</Button>
		</>
	);
};

export default AuthNavLink;
