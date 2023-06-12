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
  // const newGame = await client.game.createMany({
  //   data: [
  //     {
  //       idPlayer1: "6483752c70bbd538d654c6f9",
  //       idPlayer2: "64761c3da19ef284404a7e6c",
  //       TurnId: "6483752c70bbd538d654c6f9",
  //       PointsP1: 5,
  //       PointsP2: 5,
  //       Over: false,
  //     },
  //     {
  //       idPlayer1: "6483752c70bbd538d654c6f9",
  //       idPlayer2: "64761c3da19ef284404a7e6c",
  //       TurnId: "64761c3da19ef284404a7e6c",
  //       PointsP1: 4,
  //       PointsP2: 3,
  //       Over: false,
  //     },
  //     {
  //       idPlayer1: "6483752c70bbd538d654c6f9",
  //       idPlayer2: "64761c3da19ef284404a7e6c",
  //       TurnId: "64761c3da19ef284404a7e6c",
  //       PointsP1: 9,
  //       PointsP2: 10,
  //       Over: true,
  //     },
  //   ],
  // });
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
    <main className="min-h-full w-full  flex flex-col justify-center items-center bg-blue-300">
      <section className="h-full w-4/12 bg-white px-2">
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
