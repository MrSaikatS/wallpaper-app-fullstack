import LogoutButton from "@/components/Buttons/LogoutButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";
import { Suspense } from "react";
import NavProfileImg from "./NavProfileImg";

const DesktopNav = () => {
  return (
    <div className="flex items-center gap-8">
      <Link
        href={"/studio"}
        className="hover:underline">
        Dashboard
      </Link>

      <Link
        href={"/studio/create"}
        className="hover:underline">
        Create
      </Link>

      <Link
        href={"/studio/profile"}
        aria-label="Profile">
        <Suspense
          fallback={
            <div className="bg-muted h-8.75 w-8.75 animate-pulse rounded-full"></div>
          }>
          <NavProfileImg />
        </Suspense>
      </Link>

      <LogoutButton />

      <ThemeToggleButton />
    </div>
  );
};

export default DesktopNav;
