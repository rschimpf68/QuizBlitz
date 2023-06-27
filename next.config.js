/** @type {import('next').NextConfig} */

const nextConfig = {

   experimental: {
      serverActions: true,
   },
   images: {
      dangerouslyAllowSVG: true,
      domains: ['api.dicebear.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'localhost', 'uploadthing.com'],

   },

}

module.exports = nextConfig
