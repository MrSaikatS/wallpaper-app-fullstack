import Header from "@/components/Header/PublicHeader/Header";

type FrontendLayoutProps = {
	children: React.ReactNode;
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
