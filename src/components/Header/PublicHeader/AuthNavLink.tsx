"use client";

import { buttonVariants } from "@/components/shadcnui/button";
import { authClient } from "@/lib/betterAuth/auth-client";
import Link from "next/link";

const AuthNavLink = () => {
  const { data } = authClient.useSession();

  if (data) {
    return (
      <Link
        href="/studio"
        className={`hover:underline ${buttonVariants({ variant: "outline", size: "sm" })}`}>
        Dashboard
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/auth"
        className={`hover:underline ${buttonVariants({ variant: "outline", size: "sm" })}`}>
        Login
      </Link>

      <Link
        href="/auth/register"
        className={`hover:underline ${buttonVariants({ variant: "outline", size: "sm" })}`}>
        Register
      </Link>
    </>
  );
};

export default AuthNavLink;
