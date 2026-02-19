import z from "zod";

const serverEnvSchema = z.object({
	DATABASE_URL: z.string({ error: "DATABASE_URL Not Found" }),
	BETTER_AUTH_SECRET: z.string({
		error: "BETTER_AUTH_SECRET Key Not Found",
	}),
	BETTER_AUTH_URL: z.url({ error: "BETTER_AUTH_URL Not Found" }),
	SPACES_KEY: z.string({ error: "SPACES_KEY Not Found" }),
	SPACES_SECRET: z.string({ error: "SPACES_SECRET Not Found" }),
	SPACES_ENDPOINT: z.string({ error: "SPACES_ENDPOINT Not Found" }),
});

const serverEnvVars = {
	SPACES_ENDPOINT: process.env.SPACES_ENDPOINT,
	SPACES_SECRET: process.env.SPACES_SECRET,
	SPACES_KEY: process.env.SPACES_KEY,
	BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
	BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
	DATABASE_URL: process.env.DATABASE_URL,
};

export const serverEnv = serverEnvSchema.parse(serverEnvVars);
