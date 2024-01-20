/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
      fileName: true,
      pure: true,
      cssProp: true,
    },
  },
  images: {
    domains: ["www.healthyseasonalrecipes.com","https://product-assets.faasos.io"],
  },
};

module.exports = nextConfig;
