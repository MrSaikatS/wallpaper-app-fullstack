"use server";

import { auth } from "@/lib/betterAuth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const authUserServer = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/auth/login");
	}

	return {
		name: session.user.name,
		image: session.user.image as string,
	};
};

export default authUserServer;
