/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["static.thenounproject.com", "fdotwww.blob.core.windows.net"],
  },
  experimental: {
    serverActions: true,
  },
};

export default config;
