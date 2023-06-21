import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import axios from "axios";
import client from "../../libs/prismadb";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession()
    console.log(session)

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