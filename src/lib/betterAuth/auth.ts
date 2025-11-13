import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { serverEnv } from "../env/serverEnv";
import { prisma } from "../prisma";
import { hashPasswordFunction, verifyPasswordFunction } from "./argon2";

export const auth = betterAuth({
	secret: serverEnv.BETTER_AUTH_SECRET,
	database: prismaAdapter(prisma, {
		provider: "sqlite", // or "mysql", "postgresql", ...etc
	}),
	plugins: [nextCookies()],
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: false,
		password: {
			hash: hashPasswordFunction,
			verify: verifyPasswordFunction,
		},
	},
	advanced: {
		cookiePrefix: "wp",
		database: {
			generateId: false,
		},
	},
});
