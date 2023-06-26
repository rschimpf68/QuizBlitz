"use server";
import client from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

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
export async function newGame(idPlayer1: string, idPlayer2?: string) {
   if (idPlayer2 == undefined) {
      return findRandomGame(idPlayer1);
   }
   const game = await client.game.create({
      data: {
         idPlayer1: idPlayer1,
         idPlayer2: idPlayer2,
         Turn: 1,
         Over: false,
         TurnIsOver: true,

      }

   })

   return game.id


}
async function findRandomGame(playerId: string) {
   let gameId;

   const availableGame = await client.game.findFirst({
      where: {
         Player2: null,
         Turn: 0,
         NOT: {
            idPlayer1: playerId,
         },
      },
      select: {
         id: true,
      },
   });

   if (availableGame) {
      gameId = availableGame.id;
      const update = await client.game.update({
         where: { id: availableGame.id },
         data: {
            idPlayer2: playerId,
            Turn: 2,
            TurnIsOver: true,
         },
      });
   } else {
      const newGame = await client.game.create({
         data: {
            idPlayer1: playerId as string,
            Turn: 1,
            Over: false,
            TurnIsOver: true
         },
      });

      gameId = newGame.id;
   }
   return gameId;
}