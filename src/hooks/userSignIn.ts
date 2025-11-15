import { authClient } from "@/lib/betterAuth/auth-client";
import { LoginType } from "@/lib/types";

const userSignIn = async ({ email, password, rememberMe }: LoginType) => {
	try {
		const { error, data } = await authClient.signIn.email({
			email, // required
			password, // required
			rememberMe,
		});

		if (error) {
			return {
				isSuccess: false,
				message: error.message,
			};
		}

		return {
			isSuccess: true,
			message: `Welcome ${data.user.name} 🤗`,
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "User login Failed 🥲",
		};
	}
};

export default userSignIn;
