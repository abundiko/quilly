/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },

  images: {
    domains: ["qkpmyljleclxdbfzafat.supabase.co"]
  }
};

module.exports = nextConfig;
