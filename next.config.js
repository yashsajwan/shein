/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized:true,
    domains: [
      "images.unsplash.com",
      "storage.googleapis.com",
      "firebasestorage.googleapis.com",
      "cdn.shopify.com",
      "upload.wikimedia.org",
      "instagram.com"
    ],
  },
  webpack: (config) => {
    let modularizeImports = null;
    config.module.rules.some((rule) =>
      rule.oneOf?.some((oneOf) => {
        modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports;
        return modularizeImports;
      })
    );
    if (modularizeImports?.["@headlessui/react"])
      delete modularizeImports["@headlessui/react"];
    return config;
  },
};

module.exports = nextConfig;
