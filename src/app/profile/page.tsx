import UpdateName from "../components/profile/UpdateName";
import Header from "../components/profile/Header";
import UploadAvatar from "../components/profile/UpdateAvatar";
import client from "../libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Main from "../components/profile/Main";
import { User } from "@prisma/client";
export default async function Profile() {
  const session = await getServerSession(authOptions);

  const user = await client.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });
  const FinishedGames = await client.game.findMany({
    where: {
      OR: [
        {
          Over: true,
          idPlayer1: user?.id,
        },
        {
          Over: true,
          idPlayer2: user?.id,
        },
      ],
    },
  });

  const oponentes: { [key: string]: number } = {};
  FinishedGames.forEach((game) => {
    const oponente =
      user?.id === game.idPlayer1
        ? (game.idPlayer2 as string)
        : (game.idPlayer1 as string);
    if (oponentes[oponente]) {
      oponentes[oponente]++;
    } else {
      oponentes[oponente] = 1;
    }
  });

  let FavoriteOpponent: User | null = null;

  if (Object.keys(oponentes).length > 0) {
    const IdFavoriteOpponent = Object.keys(oponentes).reduce((a, b) =>
      oponentes[a] > oponentes[b] ? a : b
    );

    FavoriteOpponent = await client.user.findUnique({
      where: { id: IdFavoriteOpponent },
    });
  }
  //console.log(FavoriteOpponent);

  return (
    <Main
      loggedUser={user as User}
      FinishedGames={FinishedGames}
      FavoriteOpponent={FavoriteOpponent}
    />
  );
}
