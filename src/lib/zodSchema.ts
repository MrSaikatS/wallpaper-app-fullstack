import z from "zod";

export const loginSchema = z.object({
	email: z.email({ error: "Invalid email address" }),
	password: z
		.string()
		.min(8, { error: "Password must be minimum 8 characters long" }),
	rememberMe: z.boolean(),
});

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, { error: "Name must be minimum 2 characters long" }),

		email: z.email({ error: "Invalid email address" }),

		password: z
			.string()
			.min(8, { error: "Password must be minimum 8 characters long" }),

		confirmPassword: z.string().min(1, { error: "Password didn't match" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		error: "Password didn't match",
		path: ["confirmPassword"],
	});

// user create category schema
export const createCategorySchema = z.object({
	category: z
		.string()
		.min(3, { error: "Category must be minimum 3 characters long" }),
});
