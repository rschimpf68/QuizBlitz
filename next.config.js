/** @type {import('next').NextConfig} */

const nextConfig = {

   experimental: {
      serverActions: true,
   },
   images: {
      domains: ['api.dicebear.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'localhost'],
   },

}

module.exports = nextConfig
