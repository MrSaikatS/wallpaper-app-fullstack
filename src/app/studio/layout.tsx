import Header from "@/components/Header/PrivateHeader/Header";
import { ReactNode } from "react";

type StudioLayoutProps = {
  children: ReactNode;
};

const StudioLayout = ({ children }: StudioLayoutProps) => {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-3">{children}</main>
    </>
  );
};

export default StudioLayout;
