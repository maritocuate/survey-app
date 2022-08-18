/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: ['./src'],
    prependData: `@import "styles/_variables.scss";`
  }
}

module.exports = nextConfig
