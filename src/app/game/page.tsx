import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import client from "../libs/prismadb";
import Email from "next-auth/providers/email";
import UserGameDescription from "../components/UserGameDescription";
import { Game } from "@prisma/client";
import Link from "next/link";

export default async function PreGame() {
  const session = await getServerSession(authOptions);
  let gameId: string;
  const playerId = await client.user.findUnique({
    where: { email: session?.user?.email as string },
    select: { id: true },
  });
  const availableGame = await client.game.findFirst({
    where: {
      Player2: null,
      TurnId: null,
      NOT: {
        idPlayer1: playerId?.id,
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
        idPlayer2: playerId?.id,
      },
    });
  } else {
    const newGame = await client.game.create({
      data: {
        idPlayer1: playerId?.id as string,
        TurnId: playerId?.id as string,
        PointsP1: 0,
        PointsP2: 0,
      },
    });

    gameId = newGame.id;
  }
  const game = await client.game.findUnique({
    where: { id: gameId },
    include: { Player1: true, Player2: true },
  });

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-blue-200">
      <section className="flex flex-col items-center justify-center bg-white w-4/12 min-h-screen">
        <div className="h-auto w-auto mb-5">
          <UserGameDescription username={game?.Player1.name} />
        </div>
        <div>
          <h1>VS</h1>
        </div>
        <div className="h-auto w-auto mt-5">
          <UserGameDescription username={game?.Player2?.name} />
        </div>
        <Link
          href={`/game/${game?.id}`}
          className=" flex w-40 h-auto justify-center text-lg bg-red-500 items-center"
        >
          {" "}
          Empezar
        </Link>
      </section>
    </main>
  );
}
