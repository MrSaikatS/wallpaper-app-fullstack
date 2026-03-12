import Link from "next/link";
import AuthNavLink from "./AuthNavLink";

const Header = () => {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-b shadow backdrop-blur-2xl"
      aria-label="app-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href={"/"}>
          <h1
            className="text-2xl font-semibold"
            aria-label="App Name">
            DripWall 🫠
          </h1>
        </Link>

        <nav className="flex items-center">
          <AuthNavLink />
        </nav>
      </div>
    </header>
  );
};

export default Header;
