/** @type {import('next').NextConfig} */

const nextConfig = {

   experimental: {
      serverActions: true,
   },
   env: {
      NEXTAUTH_SECRET : "CONTRASEÑAXD"
   },

}

module.exports = nextConfig
