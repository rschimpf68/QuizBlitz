import NextAuth, {AuthOptions} from "next-auth";
import prisma from '../../../lib/prisma'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
// import bcrypt from 'bcrypt'



export const authOptions: AuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID as string,
         clientSecret: process.env.GITHUB_SECRET as string,
     }),
     GoogleProvider({
         clientId: process.env.GOOGLE_ID as string,
         clientSecret: process.env.GOOGLE_SECRET as string,
      }),
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" },
            username: { label: "Username", type: "text", placeholder: "John Smith" },
         },
         async authorize(credentials) {
            // Add logic here to look up the user from the credentials supplied
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
            if (user) {
              return user
            } else {
              return null
            }
         },            
      })
   ],
   secret :  process.env.SECRET,
   session: {
      strategy : "jwt",
   },
   debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)

// const handler = NextAuth(authOptions)
// export {handler as GET, handler as POST}