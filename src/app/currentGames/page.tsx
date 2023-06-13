import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import client from "../libs/prismadb";
import Email from "next-auth/providers/email";
import UserGameDescription from "../components/UserGameDescription";
import { Game } from "@prisma/client";
import Link from "next/link";
import ModuleShowGame, { ModuleType } from "../components/ModuleShowGame";
import { Module } from "module";

export default async function PreGame() {
  const session = await getServerSession(authOptions);
  let gameId: string;
  const playerId = await client.user.findUnique({
    where: { email: session?.user?.email as string },
    select: { id: true },
  });

  const games = await client.game.findMany({
    where: {
      OR: [
        {
          idPlayer1: playerId?.id,
        },
        {
          idPlayer2: playerId?.id,
        },
      ],
    },
    include: {
      Player1: true,
      Player2: true,
      Rounds: true,
    },
  });
  const finishedGames = games.filter((game) => game.Over === true);
  const unFinishedGames = games.filter((game) => game.Over === false);
  const pendingGames = unFinishedGames.filter(
    (game) => game.TurnId === playerId?.id
  );
  const waitingGames = unFinishedGames.filter(
    (game) => game.TurnId !== playerId?.id
  );
  return (
    <main className="w-full  flex flex-col justify-center items-center bg-blue-300 min-h-screen">
      <section className="min-h-screen w-4/12 bg-white px-2 flex flex-col items-center justify-center">
        <Link href={"Link"}></Link>
        {pendingGames.length > 0 && (
          <ModuleShowGame
            text="Tu Turno"
            games={pendingGames}
            type={ModuleType.your}
            userId={playerId?.id}
          />
        )}

        {waitingGames.length > 0 && (
          <ModuleShowGame
            text="Su Turno"
            games={waitingGames}
            type={ModuleType.their}
            userId={playerId?.id}
          />
        )}
        {finishedGames.length > 0 && (
          <ModuleShowGame
            text="Juegos Terminados"
            games={finishedGames}
            type={ModuleType.finished}
            userId={playerId?.id}
          />
        )}
      </section>
    </main>
  );
}
