import Header from "@/components/Header/PublicHeader/Header";
import { ReactNode } from "react";

type FrontendLayoutProps = {
  children: ReactNode;
};

const FrontendLayout = ({ children }: FrontendLayoutProps) => {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-3">{children}</main>
    </>
  );
};

export default FrontendLayout;
