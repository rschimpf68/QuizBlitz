import { Category } from '@prisma/client'
import prisma from '.'

export async function getCategories() {
   try {
      const categories = await prisma.category.findMany()
      return { categories }
   } catch (error) {
      return { error }
   }

}
export async function createUser(category: Category) {
   try {
      const categoryFromDb = await prisma.category.create({
         data: { "name": category.name }
      })
      return { categoryFromDb }
   } catch (error) {
      return error
   }
}