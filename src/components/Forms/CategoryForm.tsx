"use client";

import createCategory from "@/hooks/action/createCategory";
import { dialogDrawerAtom } from "@/lib/jotaiAtom";
import { CreateCategoryType } from "@/lib/types";
import { createCategorySchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { Loader2Icon, UploadIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const CategoryForm = () => {
	const setOpen = useSetAtom(dialogDrawerAtom);

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
							autoComplete="off"
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
	);
};

export default CategoryForm;
