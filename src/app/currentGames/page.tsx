import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import client from "../libs/prismadb";
import Email from "next-auth/providers/email";
import UserGameDescription from "../components/UserGameDescription";
import { Game } from "@prisma/client";
import Link from "next/link";
import ModuleShowGame, { ModuleType } from "../components/ModuleShowGame";
import { Module } from "module";
import Image from "next/image";

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
    <main className="w-full  flex flex-col justify-center items-center bg-BlueBG min-h-screen">
      <section className="min-h-screen w-4/12 bg-[url(/images/Background.gif)] px-2 flex flex-col  py-5">
        <div className="w-full h-auto flex justify-start">
          <Link
            href={"/"}
            className=" w-auto h-auto  items-center hover:scale-105  "
          >
            <Image
              src={"/images/LeftArrow.png"}
              width={40}
              height={60}
              alt="arrow"
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
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
        </div>
      </section>
    </main>
  );
}
