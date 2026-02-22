import z from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SPACES_CDN_ENDPOINT: z.url({
    error: "NEXT_PUBLIC_SPACES_CDN_ENDPOINT Not Found",
  }),
});

const clientEnvVars = {
  NEXT_PUBLIC_SPACES_CDN_ENDPOINT: process.env.NEXT_PUBLIC_SPACES_CDN_ENDPOINT,
};

export const clientEnv = clientEnvSchema.parse(clientEnvVars);
