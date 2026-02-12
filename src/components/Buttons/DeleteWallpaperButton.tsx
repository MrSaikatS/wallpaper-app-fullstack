import deleteWallpaper from "@/hooks/action/deleteWallpaper";
import { authClient } from "@/lib/betterAuth/auth-client";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

type DeleteWallpaperButtonProps = {
	wallpaperImg: string;
	wallpaperOwnerId: string;
	wallpaperId: string;
};

const DeleteWallpaperButton = ({
	wallpaperId,
	wallpaperImg,
	wallpaperOwnerId,
}: DeleteWallpaperButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const { data } = authClient.useSession();

	if (!data) {
		return null;
	}

	const {
		user: { id },
	} = data;

	if (id !== wallpaperOwnerId) {
		return null;
	}

	const wallpaperDeleteHandler = async () => {
		const { isSuccess, message } = await deleteWallpaper(
			wallpaperId,
			wallpaperImg,
		);

		if (!isSuccess) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
			setIsLoading(true);
		}

		setIsLoading(false);
	};

	return (
		<Button
			onClick={wallpaperDeleteHandler}
			disabled={isLoading}
			className="absolute top-0 right-0 z-50 mt-2 mr-2 cursor-pointer bg-red-600 text-white">
			{isLoading ? (
				<>
					<Loader2Icon className="animate-spin" /> Deleting...
				</>
			) : (
				<>
					<Trash2Icon /> Delete
				</>
			)}
		</Button>
	);
};

export default DeleteWallpaperButton;
