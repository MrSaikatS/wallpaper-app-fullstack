"use client";

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Button } from "../shadcnui/button";
import { Loader2Icon, UploadIcon } from "lucide-react";
import { useAtom } from "jotai";
import { dialogDrawerAtom } from "@/lib/jotaiAtom";
import { createCategorySchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCategoryType } from "@/lib/types";
import createCategory from "@/hooks/action/createCategory";
import { toast } from "react-toastify";

const CategoryForm = () => {
	const [, setOpen] = useAtom(dialogDrawerAtom);
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		reset,
	} = useForm({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			category: "",
		},
	});

	const categoryHandeler = async ({ category }: CreateCategoryType) => {
		await new Promise((r) => setTimeout(r, 1500));

		const { isSuccess, message } = await createCategory(category);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			setOpen(false);
			toast.success(message);
			reset();
		}
	};
	return (
		<>
			<form
				onSubmit={handleSubmit(categoryHandeler)}
				className="grid gap-6"
				noValidate>
				{/* category field */}
				<Controller
					name="category"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Category</FieldLabel>
							<Input
								{...field}
								id={field.name}
								aria-invalid={fieldState.invalid}
								placeholder="Enter your category"
								autoComplete="category"
							/>
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
							<Loader2Icon className="animate-spin" /> Submitting...
						</>
					) : (
						<>
							<UploadIcon /> Submit
						</>
					)}
				</Button>
			</form>
		</>
	);
};

export default CategoryForm;
