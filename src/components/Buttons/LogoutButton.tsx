"use client";

import { authClient } from "@/lib/betterAuth/auth-client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  const { push } = useRouter();

  const logoutHandler = useCallback(() => {
    startTransition(async () => {
      try {
        const { error } = await authClient.signOut();

        if (error) {
          toast.error(error.message);
        }

        if (!error) {
          toast.success("User Logout Successfully 👍");
          push("/auth");
        }
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Logout Failed. Please Try again 😢");
      }
    });
  }, [push]);

  return (
    <Button
      onClick={logoutHandler}
      disabled={isPending}
      variant={"destructive"}
      className="cursor-pointer">
      {isPending ?
        <>
          <Loader2Icon className="animate-spin" /> Logging out...
        </>
      : <>
          <LogOutIcon />
          Logout
        </>
      }
    </Button>
  );
};

export default LogoutButton;
