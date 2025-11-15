import { authClient } from "@/lib/betterAuth/auth-client";
import { RegisterType } from "@/lib/types";

const userSignUp = async ({ name, email, password }: RegisterType) => {
	try {
		const { error } = await authClient.signUp.email({
			name,
			email,
			password,
			image: "avatar.png",
		});

		if (error) {
			return {
				isSuccess: false,
				message: error.message,
			};
		}

		return {
			isSuccess: true,
			message: "User Registration Successfully 👍",
		};
	} catch (error) {
		console.log(error);

		return {
			isSuccess: false,
			message: "User Registration Failed 🥲",
		};
	}
};

export default userSignUp;
