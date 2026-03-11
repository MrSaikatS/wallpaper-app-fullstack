import Header from "@/components/Header/PublicHeader/Header";
import { ReactNode } from "react";

type FrontendLayoutProps = {
  children: ReactNode;
};

const FrontendLayout = ({ children }: FrontendLayoutProps) => {
  return (
    <>
      <Header />

      <main className="mx-auto mt-16 max-w-7xl px-4 py-3">{children}</main>
    </>
  );
};

export default FrontendLayout;
