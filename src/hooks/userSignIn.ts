import { authClient } from "@/lib/betterAuth/auth-client";
import { LoginType } from "@/lib/types";

const userSignIn = async ({ email, password, rememberMe }: LoginType) => {
  try {
    const { error, data } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    if (error) {
      const errorMessages: Record<string, string> = {
        INVALID_CREDENTIALS: "Invalid email or password",
        EMAIL_NOT_VERIFIED: "Please verify your email before signing in",
        ACCOUNT_NOT_FOUND: "Account not found",
        // Add more error codes as needed
      };

      const sanitizedMessage =
        error.code && errorMessages[error.code] ?
          errorMessages[error.code]
        : "Sign-in failed, please try again";

      console.error("Sign in error details:", error);

      return {
        isSuccess: false,
        message: sanitizedMessage,
      };
    }

    return {
      isSuccess: true,
      message: `Welcome ${data.user.name} 🤗`,
    };
  } catch (error) {
    console.error("Sign in error:", error);

    return {
      isSuccess: false,
      message: "User login Failed 🥲",
    };
  }
};

export default userSignIn;
