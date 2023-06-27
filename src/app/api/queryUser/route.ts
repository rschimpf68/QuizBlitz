import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(request: Request) {
   const body = await request.json();
   const { email } = body;

   const user = await prisma.user.findUnique({

       where: {
           email: email
       },
       select: {
         name: true
       }
   })
  
   return NextResponse.json(user?.name)
 }