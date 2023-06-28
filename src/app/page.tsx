import { User } from "@prisma/client";
import Howl from "react-howler";
import client from "./libs/prismadb";
import Image from "next/image";
import PlayButton from "./components/buttons/B-Play";
import SoundButton from "./components/buttons/B-Mute";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBarMenu from "./components/(NavBar)/NavBarMenu";
import Sound from "./components/Sound";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await client.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  const notFinishedGames = await client.game.findFirst({
    where: {
      OR: [
        {
          idPlayer1: user?.id,
          TurnIsOver: false,
        },
        {
          idPlayer2: user?.id,
          TurnIsOver: false,
        },
      ],
    },
    select: { id: true },
  });
  if (notFinishedGames) {
    redirect(`game/${notFinishedGames.id}`);
  }
  //const game = await client.game.deleteMany({});
  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className=" bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center">
        <section className="h-1/2 w-full flex flex-col">
          <div className="flex justify-center  items-center  w-full flex-1 flex-grow  ">
            <Image
              src="/images/QBTitle.png"
              alt="QuizBlitz"
              width={320}
              height={67}
              draggable="false"
            />
          </div>
        </section>
        <div className="flex justify-center h-1/4 items-center w-full ">
          <PlayButton
            unpressedImageUrl="/images/Normal1.png"
            pressedImageUrl="/images/Push1.png"
            href="/selectOpponent"
            useLink={false}
          />
        </div>
        <section className="w-full flex h-1/4 flex-col justify-end items-end relative ">
          <NavBarMenu />
        </section>
      </div>
    </div>
  );
}
