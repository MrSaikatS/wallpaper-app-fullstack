import { authClient } from "@/lib/betterAuth/auth-client";
import { RegisterType } from "@/lib/types";

const userSignUp = async ({ name, email, password }: RegisterType) => {
  try {
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      const errorMessages: Record<string, string> = {
        INVALID_CREDENTIALS: "Invalid email or password",
        EMAIL_NOT_VERIFIED: "Please verify your email before signing in",
        ACCOUNT_NOT_FOUND: "Account not found",
        USER_ALREADY_EXISTS: "User already registered",
        // Add more error codes as needed
      };

      const sanitizedMessage =
        error.code && errorMessages[error.code] ?
          errorMessages[error.code]
        : "Sign-up failed, please try again";

      console.error("Sign up error details:", error);

      return {
        isSuccess: false,
        message: sanitizedMessage,
      };
    }

    return {
      isSuccess: true,
      message: "User Registration Successfully 👍",
    };
  } catch (error) {
    console.error("Sign up error:", error);

    return {
      isSuccess: false,
      message: "User Registration Failed 🥲",
    };
  }
};

export default userSignUp;
