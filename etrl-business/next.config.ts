import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.etrl.chat",
          },
        ],
        destination: "https://etrl.chat/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
