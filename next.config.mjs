import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /\/api\/auth\/session/,
        handler: "NetworkFirst",
        options: {
          cacheName: "next-auth-session",
          expiration: {
            maxEntries: 1,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },

      {
        urlPattern: /\/api\/paragraphs/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "api-data",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: /.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "others",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing nextConfig here
};

export default withPWA(nextConfig);

