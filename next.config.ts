import type { NextConfig } from "next";

const envFile =
  process.env.APP_ENV === "beta"
    ? ".env.beta"
    : process.env.APP_ENV === "prod"
      ? ".env"
      : ".env.dev";

require("dotenv").config({
  path: envFile,
  override: true,
});

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nadoharu-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default withPWA(nextConfig);
