import { NextRequest, NextResponse } from "next/server";
import client from "../../libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { resolve } from "path";
import { rejects } from "assert";
export async function GET(request: NextRequest) {

    const session = await getServerSession(authOptions)

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

 
