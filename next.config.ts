import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 async redirects() {
  return [
    { source: "/profile", destination: "/about", permanent: true },
    { source: "/company-profile", destination: "/about", permanent: true },
  ]
} /* config options here */
};

export default nextConfig;
