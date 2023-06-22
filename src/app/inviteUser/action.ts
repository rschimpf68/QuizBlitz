"use server";
import client from "@/app/libs/prismadb";

export async function findUser(
   userName: string
) {

   const users = client.user.findMany({
      take: 12,
      where: {
         name: {
            startsWith: userName
         }

      }

   })
   return users;

}
export async function newGame(idPlayer1: string, idPlayer2: string) {

   const game = await client.game.create({
      data: {
         idPlayer1: idPlayer1,
         idPlayer2: idPlayer2,
         Turn: 1,
         Over: false,
      }

   })
   console.log(game);
   return game.id

}