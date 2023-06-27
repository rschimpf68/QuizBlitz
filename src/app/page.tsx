import { User } from "@prisma/client";

import client from "./libs/prismadb";
import Image from "next/image";
import PlayButton from "./components/buttons/B-Play";
import SoundButton from "./components/buttons/B-Mute";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBarMenu from "./components/(NavBar)/NavBarMenu";

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

  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className=" bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center">
        <section className="h-1/2 w-full flex flex-col">
          {/* <div className="w-full p-4 flex justify-end items-start ">
            <SoundButton
              initialImageUrl="/images/MusicOn.png"
              transitionImageUrl="/images/MusicTransition2.png"
              finalImageUrl="/images/MusicOff.png"
            />
          </div> */}
          <div className="flex justify-center  items-center  w-full h-full flex-1 flex-grow  ">
            <Image
              src="/images/QBTitle.png"
              alt="QuizBlitz"
              width={320}
              height={67}
              draggable="false"
            />
          </div>
        </section>
        <section className="flex justify-center h-1/4 items-center w-full">
          <PlayButton
            unpressedImageUrl="/images/Normal1.png"
            pressedImageUrl="/images/Push1.png"
            href="/selectOpponent"
            useLink={true}
          />
        </section>
        <section className="w-full h-1/4 flex justify-end items-end ">
          <NavBarMenu />
        </section>
      </div>
    </div>
  );
}
