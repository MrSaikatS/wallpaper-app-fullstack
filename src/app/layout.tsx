import ThemeProvider from "@/components/Providers/ThemeProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

type RootLayoutProps = {
	children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute={"class"}
					defaultTheme="dark"
					enableSystem={false}>
					<NuqsAdapter>{children}</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
