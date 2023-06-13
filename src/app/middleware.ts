import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from "next-auth/middleware"


export default withAuth(
   // `withAuth` augments your `Request` with the user's token.
   function middleware(req) {
     console.log(req.nextauth);
     if (
       req.nextUrl.pathname === "/ShowSession" &&
       req.nextauth.token?.role !== "admin"
     ) {
       return new NextResponse("You are not authorized!");
     }
   },
   {
     callbacks: {
       authorized: (params) => {
         let { token } = params;
         return !!token;
       },
     },
   }
 );


export const config = {
   matcher: ['/ShowSession']
}