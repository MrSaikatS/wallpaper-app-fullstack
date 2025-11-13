import z from "zod";

const serverEnvSchema = z.object({
	DATABASE_URL: z.string({ error: "DATABASE_URL Not Found" }),
	BETTER_AUTH_SECRET: z.string({
		error: "BETTER_AUTH_SECRET Key Not Found",
	}),
	BETTER_AUTH_URL: z.url({ error: "BETTER_AUTH_URL Not Found" }),
});

const serverEnvVars = {
	DATABASE_URL: process.env.DATABASE_URL,
	BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
	BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
};

export const serverEnv = serverEnvSchema.parse(serverEnvVars);
