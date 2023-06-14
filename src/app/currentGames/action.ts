"use server"
import { Game, Round, User } from "@prisma/client";
import client from "../libs/prismadb";

export async function GetGamesByPlayerId(playerId: string): Promise<(Game & {
   Player1: User;
   Player2: User | null;
   Rounds: Round[];
})[]> {
   "use server"

   const games = await client.game.findMany({
      where: {
         OR: [
            {
               idPlayer1: playerId,
            },
            {
               idPlayer2: playerId,
            },
         ],
      },
      include: {
         Player1: true,
         Player2: true,
         Rounds: true,
      },

   });
   return games;
}