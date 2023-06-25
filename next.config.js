/** @type {import('next').NextConfig} */

const nextConfig = {

   experimental: {
      serverActions: true,
   },
   env: {
      NEXTAUTH_SECRET: "CONTRASEÑAXD"
   },
   images: {

      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'api.dicebear.com',
            pathname: '/6.x/pixel-art/**'


         },
      ],
   },

}

module.exports = nextConfig
