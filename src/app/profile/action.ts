'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import client from "../libs/prismadb";

export async function UpdateAvatar(url: string, email: string) {
   const updateUser = await client.user.update({
      where: {
         email: email
      },
      data: {
         image: url
      }
   })

}