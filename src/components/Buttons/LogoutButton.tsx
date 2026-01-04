"use client";

import { authClient } from "@/lib/betterAuth/auth-client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

const LogoutButton = () => {
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();

	const logoutHandler = async () => {
		setLoading(true);

		try {
			const { error } = await authClient.signOut();

			if (error) {
				toast.error(error.message);
			}

			if (error === null) {
				toast.success("User Logout Successfully 👍");

				push("/auth/login");
			}
		} catch (error) {
			console.log(error);

			toast.error("Logout Failed. Please Try again 😢");
		}

		setLoading(false);
	};

	return (
		<Button
			onClick={logoutHandler}
			disabled={loading}
			variant={"destructive"}
			className="cursor-pointer">
			{loading ? (
				<>
					<Loader2Icon className="animate-spin" /> Logging out...
				</>
			) : (
				<>
					<LogOutIcon />
					Logout
				</>
			)}
		</Button>
	);
};

export default LogoutButton;
