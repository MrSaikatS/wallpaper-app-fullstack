"use client";

import createWallpaper from "@/hooks/action/createWallpaper";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagesIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import z from "zod";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const WallpaperForm = () => {
	const [isFile, setIsFile] = useState(false);

	const { openFilePicker, filesContent,plainFiles } = useFilePicker({
		readAs: "DataURL",
		accept: "image/*",
		multiple: false,
		validators: [
			new FileSizeValidator({
				maxFileSize: 5 * 1024 * 1024,
			}),
		],

		onFilesSuccessfullySelected: () => setIsFile(true),
		onClear: () => setIsFile(false),
	});

	const categorySchema = z.object({
		category: z
			.string()
			.min(2, { error: "Name must be minimum 2 characters long" }),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			category: "",
		},
		mode: "all",
	});

	const categoryHandeler = async ({
		category,
	}: z.infer<typeof categorySchema>) => {
		await new Promise((r) => setTimeout(r, 1500));
 const {isSuccess,message}=await createWallpaper(category,plainFiles[0])

 if (!isSuccess) {
	toast.error(message)
 }

	if (isSuccess) {
	toast.success(message)

 }	
	};

	
	return (
		<div className="grid gap-4">
			{!isFile && (
				<Image
					src={"https://placehold.co/1920x1080"}
					alt="Avatar Image"
					width={640}
					height={360}
					className="aspect-video h-[360px] w-[640px] rounded-sm object-cover"
				/>
			)}

			{filesContent.map((file, idx) => (
				<Image
					key={idx}
					src={file.content}
					alt={file.name}
					width={640}
					height={360}
					className="aspect-square h-[360px] w-[640px] rounded-sm object-cover"
				/>
			))}

			<div
				className={`grid ${isFile ? "grid-cols-1" : "grid-cols-1"} mt-4 gap-4`}>
				<Button
					className="cursor-pointer"
					variant={"outline"}
					onClick={openFilePicker}>
					<ImagesIcon />
					Choose Image
				</Button>
			</div>

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
					disabled={!isFile || isSubmitting}>
					{isSubmitting ? (
						<>
							<LoaderIcon className="animate-spin" /> Submitting...
						</>
					) : (
						<>Submit</>
					)}
				</Button>
			</form>
		</div>
	);
};

export default WallpaperForm;
