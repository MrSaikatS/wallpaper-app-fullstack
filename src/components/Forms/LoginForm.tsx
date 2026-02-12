"use client";

import userSignIn from "@/hooks/userSignIn";
import { LoginType } from "@/lib/types";
import { loginSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const LoginForm = () => {
	const { replace } = useRouter();

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: true,
		},
		mode: "all",
	});

	const loginHandeler = async (lData: LoginType) => {
		const { isSuccess, message } = await userSignIn(lData);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);

			reset();

			replace(`/studio`);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(loginHandeler)}
			className="grid gap-6"
			noValidate>
			{/* Email field */}
			<Controller
				name="email"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Email</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							placeholder="Enter your email"
							autoComplete="email"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			{/* Password field */}
			<Controller
				name="password"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel htmlFor={field.name}>Password</FieldLabel>
						<Input
							{...field}
							id={field.name}
							aria-invalid={fieldState.invalid}
							type="password"
							placeholder="Enter your password"
							autoComplete="current-password"
						/>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			{/* Checkbox field */}
			<Controller
				name="rememberMe"
				control={control}
				render={({ field, fieldState }) => (
					<Field
						data-invalid={fieldState.invalid}
						orientation={"horizontal"}>
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
							className="cursor-pointer"
						/>
						<FieldLabel htmlFor={field.name}>Keep me signed in</FieldLabel>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>

			<Button
				className="w-full cursor-pointer"
				type="submit"
				disabled={isSubmitting}>
				{isSubmitting ? (
					<>
						<Loader2Icon className="animate-spin" /> Submitting..
					</>
				) : (
					<>
						<LockIcon /> Submit
					</>
				)}
			</Button>
		</form>
	);
};

export default LoginForm;
