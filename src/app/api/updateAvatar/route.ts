import { NextRequest, NextResponse } from "next/server";
import client from "../../libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { resolve } from "path";
import { getSession } from "next-auth/react";
import { rejects } from "assert";
import { request } from "http";
export async function POST(request: NextRequest) {

    // const session = await getServerSession(authOptions)
    const session = await getSession()

    // const body = await request.json();
    // const { imageUrl } = body;

    
    // const updateUser = await client.user.update({
    //     where: {
    //         email: "p@p.com"
    //     },
    //     data : {
    //         image: imageUrl,
    //     }
    // })
    
    return NextResponse.json(session)
}

 
