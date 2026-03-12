import LogoutButton from "@/components/Buttons/LogoutButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcnui/sheet";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import NavProfileImg from "./NavProfileImg";

const MobileNav = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href={"/studio/profile"}>
        <NavProfileImg />
      </Link>

      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mt-5 gap-6">
            <SheetTitle>
              <ThemeToggleButton />
              <div className="bg-foreground mt-4 h-px w-full"></div>
            </SheetTitle>

            <SheetTitle>
              <SheetClose>
                <Link href={"/"}>
                  <h1>Home</h1>
                </Link>
              </SheetClose>
              <div className="bg-foreground h-px w-full"></div>
            </SheetTitle>

            <SheetTitle>
              <SheetClose>
                <Link href={"/studio"}>
                  <h1>Dashboard</h1>
                </Link>
              </SheetClose>
              <div className="bg-foreground h-px w-full"></div>
            </SheetTitle>

            <SheetTitle>
              <SheetClose>
                <Link href={"/studio/create"}>
                  <h1>Create</h1>
                </Link>
              </SheetClose>
              <div className="bg-foreground h-px w-full"></div>
            </SheetTitle>

            <SheetTitle>
              <LogoutButton />
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
