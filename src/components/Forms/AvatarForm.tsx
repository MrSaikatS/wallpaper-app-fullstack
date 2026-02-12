"use client";

import updateAvatar from "@/hooks/action/updateAvatar";
import { ImagesIcon, Loader2Icon, UploadIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFilePicker } from "use-file-picker";
import { FileSizeValidator } from "use-file-picker/validators";
import { Button } from "../shadcnui/button";

type AvatarFormProps = {
	imgId: string | null | undefined;
};

const AvatarForm = ({ imgId }: AvatarFormProps) => {
	const [isFile, setIsFile] = useState<boolean>(false);

	const [isUploading, setIsUploading] = useState<boolean>(false);

	const { openFilePicker, filesContent, plainFiles, clear, errors } =
		useFilePicker({
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

	const handleImageSubmit = async () => {
		setIsUploading(true);

		const { isSuccess, message } = await updateAvatar(plainFiles[0]);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);

			clear();
		}

		setIsUploading(false);
	};

	return (
		<div className="flex flex-col justify-center gap-4">
			<div className="grid place-items-center">
				{!isFile && (
					<Image
						src={
							imgId ? `/upload/avatar/${imgId}` : `/upload/avatar/avatar.png`
						}
						alt={imgId ?? ""}
						width={240}
						height={240}
						className="aspect-square h-60 w-60 rounded-full object-cover"
					/>
				)}

				{filesContent[0] && (
					<Image
						src={filesContent[0].content}
						alt={filesContent[0].name}
						width={240}
						height={240}
						className="aspect-square h-60 w-60 rounded-full object-cover"
					/>
				)}
			</div>

			{errors[0] && (
				<div className="text-destructive text-center text-sm">
					File is Too large (5mb)
				</div>
			)}

			<div
				className={`grid ${isFile ? "grid-cols-2" : "grid-cols-1"} mt-4 gap-4`}>
				<Button
					className="cursor-pointer"
					variant={"outline"}
					onClick={openFilePicker}>
					<ImagesIcon />
					Change Image
				</Button>

				{isFile && (
					<Button
						onClick={handleImageSubmit}
						disabled={isUploading}
						className="cursor-pointer">
						{isUploading ? (
							<>
								<Loader2Icon className="animate-spin" />
								Uploading...
							</>
						) : (
							<>
								<UploadIcon />
								Upload Image
							</>
						)}
					</Button>
				)}
			</div>
		</div>
	);
};

export default AvatarForm;
