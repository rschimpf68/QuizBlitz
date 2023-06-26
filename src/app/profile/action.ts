'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import client from "../libs/prismadb";

export async function  UpdateAvatar(url: string){
   const session = await getServerSession(authOptions);
   console.log()
   console.log(session)
   // const updateUser = await client.user.update({
   //    where: {
   //       email: session?.user?.email as string
   //    },
   //    data: {
   //       image: url
   //    }
   // })
   
}