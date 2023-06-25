import { NextRequest, NextResponse } from "next/server";
import client from "../../libs/prismadb";

export async function POST(request: NextRequest) {

    const body = await request.json();
    const { name, email } = body;

    const updatedUser = await client.user.update({
        where: {
            email: email
        },
        data : {
            name: name,
        }
    })
    
    return NextResponse.json(updatedUser)
}

 
