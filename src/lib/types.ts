import z from "zod";
import { loginSchema, registerSchema } from "./zodSchema";

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
