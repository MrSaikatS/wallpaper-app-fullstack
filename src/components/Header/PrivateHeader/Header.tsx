import LogoutButton from "@/components/Buttons/LogoutButton";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import Link from "next/link";
import { Suspense } from "react";
import NavProfileImg from "./NavProfileImg";

const Header = () => {
	return (
		<header
			className="border-b shadow"
			aria-label="app-header">
			<div className="container mx-auto flex items-center justify-between px-6 py-3">
				<Link href={"/studio"}>
					<h1
						className="text-2xl font-semibold"
						aria-label="App Name">
						NST App
					</h1>
				</Link>

				<nav className="flex items-center gap-4">
					<Link href={"/studio"}>Dashbord</Link>
					<Link href={"/studio/create"}>Create</Link>
					<Link href={"/studio/profile"}>
						<Suspense fallback={<div className="h-[35px] w-[35px]"></div>}>
							<NavProfileImg />
						</Suspense>
					</Link>

					<LogoutButton />
					<ThemeToggleButton />
				</nav>
			</div>
		</header>
	);
};

export default Header;
