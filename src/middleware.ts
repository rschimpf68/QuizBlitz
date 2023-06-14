import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from "next-auth/middleware"
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET
  });
  if (!token) {
    return NextResponse.rewrite(new URL('/login', req.url))
  }
  
  return NextResponse.next()
}

export const config = {
   matcher: ['/', '/profile']
}