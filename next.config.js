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
}

module.exports = nextConfig
