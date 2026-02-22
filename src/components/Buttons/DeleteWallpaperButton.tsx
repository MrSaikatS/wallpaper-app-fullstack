"use client";

import deleteWallpaper from "@/hooks/action/deleteWallpaper";
import { authClient } from "@/lib/betterAuth/auth-client";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcnui/dialog";

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
    <Dialog>
      <DialogTrigger
        render={
          <Button
            disabled={isLoading}
            className="absolute top-0 right-0 z-50 mt-2 mr-2 cursor-pointer bg-red-600 text-white hover:scale-95 hover:bg-red-500">
            <Trash2Icon /> Delete
          </Button>
        }></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this wallpaper? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={wallpaperDeleteHandler}
            disabled={isLoading}
            className="bg-red-600 text-white hover:bg-red-500">
            {isLoading ?
              <>
                <Loader2Icon className="animate-spin motion-reduce:animate-none" />{" "}
                Deleting…
              </>
            : <>Delete</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWallpaperButton;
