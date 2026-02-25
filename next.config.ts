import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wps3.sgp1.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'none'; img-src 'self' https://placehold.co https://wps3.sgp1.cdn.digitaloceanspaces.com; script-src 'none'; style-src 'unsafe-inline'; sandbox;",
  },
};

export default nextConfig;
