import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	cacheComponents: true,
	reactCompiler: true,
	typedRoutes: true,
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb",
		},
	},
	images: {
		remotePatterns: [new URL("https://placehold.co/**")],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;
