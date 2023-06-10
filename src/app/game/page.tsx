import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import client from "../libs/prismadb";
import Email from "next-auth/providers/email";

export default async function PreGame() {
  const session = await getServerSession(authOptions);
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

  let gameId = "";

  if (availableGame) {
    gameId = availableGame.id;
    const update = await client.game.update({
      where: { id: availableGame.id },
      data: {
        idPlayer2: playerId?.id,
        TurnId: playerId?.id,
      },
    });
  } else {
    const game = await client.game.create({
      data: {
        idPlayer1: playerId?.id as string,
        TurnId: playerId?.id as string,
        PointsP1: 0,
        PointsP2: 0,
      },
    });
    gameId = game.id;
  }

  return (
    <main>
      <a href={`/game/${gameId}`}> Continuar </a>
    </main>
  );
}
