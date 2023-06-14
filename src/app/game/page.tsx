import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import client from "../libs/prismadb";
import Email from "next-auth/providers/email";
import UserGameDescription from "../components/(GameComponents)/UserGameDescription";
import { Game } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import StartButton from "../components/B-Play";
import "tailwindcss/tailwind.css";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../../public/fonts/upheavtt.ttf" });

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
      Turn: 0,
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
        Turn: 2,
      },
    });
  } else {
    const newGame = await client.game.create({
      data: {
        idPlayer1: playerId?.id as string,
        Turn: 1,
        Over: false,
      },
    });

    gameId = newGame.id;
  }
  const game = await client.game.findUnique({
    where: { id: gameId },
    include: { Player1: true, Player2: true },
  });
  const PlayerIsPlayer1 = game?.Player1.id == playerId?.id;

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-BlueBG">
      <section className="flex flex-col items-center justify-center bg-customBlue w-4/12 min-h-screen">
        <div className="h-auto w-2/3 mt-36">
          <UserGameDescription
            username={
              PlayerIsPlayer1 ? game?.Player1.name : game?.Player2?.name
            }
            font={myFont}
          />
        </div>
        <div>
          <Image src={"/images/VS.png"} alt="VS" width={112} height={112} />
        </div>
        <div className="h-auto w-2/3 pb-16">
          <UserGameDescription
            username={
              !PlayerIsPlayer1 ? game?.Player1.name : game?.Player2?.name
            }
            font={myFont}
          />
        </div>

        <div className="flex-grow" />

        <div className="mt-auto mb-16">
          <StartButton
            unpressedImageUrl="/images/StartN.png"
            pressedImageUrl="/images/StartP.png"
            href={`/game/${game?.id}`}
            useLink={false}
          />
        </div>
      </section>
    </main>
  );
}
