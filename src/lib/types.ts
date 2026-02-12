import z from "zod";
import {
	categorySchema,
	createCategorySchema,
	loginSchema,
	registerSchema,
} from "./zodSchema";

export type LoginType = z.infer<typeof loginSchema>;

export type RegisterType = z.infer<typeof registerSchema>;

// user create category type
export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export type CategoryType = z.infer<typeof categorySchema>;
