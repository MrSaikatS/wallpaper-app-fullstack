import Header from "@/components/Header/PrivateHeader/Header";

type StudioLayoutProps = {
	children: React.ReactNode;
};

const StudioLayout = async ({ children }: StudioLayoutProps) => {
	return (
		<>
			{/* <Header /> */}
			<Header />

			<main className="mx-auto max-w-7xl px-6 py-3">{children}</main>
		</>
	);
};

export default StudioLayout;
