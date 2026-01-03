"use client";

import createWallpaper from "@/hooks/action/createWallpaper";
import { authClient } from "@/lib/betterAuth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagesIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import z from "zod";
import { Prisma } from "../../../generated/prisma/client";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../shadcnui/select";

export type WallpaperFormProps = {
	categoryArray: Prisma.CategoryGetPayload<{
		select: {
			id: true;
			name: true;
		};
	}>[];
};

const WallpaperForm = ({ categoryArray }: WallpaperFormProps) => {
	const [isFile, setIsFile] = useState(false);

	const { push } = useRouter();

	const { openFilePicker, filesContent, plainFiles } = useFilePicker({
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
		formState: { isSubmitting, isDirty },
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
		const { data } = await authClient.getSession();

		if (data === null) {
			return;
		}

		const {
			user: { id },
		} = data;

		await new Promise((r) => setTimeout(r, 1500));
		const { isSuccess, message } = await createWallpaper(
			category,
			plainFiles[0],
			id,
		);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
			push("/studio");
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
					className="aspect-video h-90 w-160 rounded-sm object-cover"
				/>
			)}

			{filesContent.map((file, idx) => (
				<Image
					key={idx}
					src={file.content}
					alt={file.name}
					width={640}
					height={360}
					className="aspect-square h-90 w-160 rounded-sm object-cover"
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
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<SelectTrigger>
									<SelectValue placeholder="Choose category" />
								</SelectTrigger>
								<SelectContent>
									{categoryArray.map(({ id, name }) => (
										<SelectItem
											key={id}
											value={id}>
											{name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>

				<Button
					className="w-full cursor-pointer"
					type="submit"
					disabled={!isFile || isSubmitting || !isDirty}>
					{isSubmitting ? (
						<>
							<Loader2Icon className="animate-spin" /> Creating...
						</>
					) : (
						<>Create</>
					)}
				</Button>
			</form>
		</div>
	);
};

export default WallpaperForm;
