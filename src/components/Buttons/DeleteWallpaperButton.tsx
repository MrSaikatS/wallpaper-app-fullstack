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

	// Safely extract user id without conditional returns after hooks
	const userId = data?.user?.id;
	const isOwner = userId === wallpaperOwnerId;
	const shouldRender = data && isOwner;

	const wallpaperDeleteHandler = async () => {
		setIsLoading(true);
		try {
			const { isSuccess, message } = await deleteWallpaper(
				wallpaperId,
				wallpaperImg,
			);

			if (isSuccess) {
				toast.success(message);
			} else {
				toast.error(message);
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong 🥲");
		} finally {
			setIsLoading(false);
		}
	};

	// Conditional return after all hooks and logic are defined
	if (!shouldRender) {
		return null;
	}

	return (
		<Button
			onClick={wallpaperDeleteHandler}
			disabled={isLoading}
			className="absolute top-0 right-0 z-50 mt-2 mr-2 cursor-pointer bg-red-600 text-white hover:scale-95 hover:bg-red-500">
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
