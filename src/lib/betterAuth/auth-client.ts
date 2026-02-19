import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

type AuthInstance = typeof import("./auth").auth;

export const authClient = createAuthClient({
	/** The base URL of the server (optional if you're using the same domain) */
	// baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [inferAdditionalFields<AuthInstance>()],
});
