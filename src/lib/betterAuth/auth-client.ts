import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

type AuthInstance = typeof import("./auth").auth;

/** The base URL of the server (optional if you're using the same domain) */
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<AuthInstance>()],
});
