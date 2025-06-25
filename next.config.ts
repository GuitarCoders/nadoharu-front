import type { NextConfig } from "next";

const envFile =
  process.env.APP_ENV === "canary"
    ? ".env.canary"
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
};

export default withPWA(nextConfig);
