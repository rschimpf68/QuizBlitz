import { User } from '@prisma/client'
import prisma from '.'

export async function getUser() {
   try {
      const users = await prisma.user.findMany()
      return { users }
   } catch (error) {
      return { error }
   }

}
export async function createUser(user: User) {
   try {
      const userFromDb = await prisma.user.create({
         data: { "email": user.email, "username": user.username }
      })
      return { userFromDb }
   } catch (error) {
      return error
   }
}