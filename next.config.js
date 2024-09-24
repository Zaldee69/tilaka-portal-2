/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/id/login',
        permanent: false
      }
    ];
  },
  logging: {
    fetches: {
      hmrRefreshes: true
    }
  }
};

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  reactStrictMode: false
});
