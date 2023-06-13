import { User } from "@prisma/client";

import client from "./libs/prismadb";
import Image from "next/image";
import PlayButton from "./components/B-Play";
import SoundButton from "./components/B-Mute";
import DropdownMenu from "./components/B-Menu";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuth from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  // const deleteGame = await client.game.deleteMany({
  //   where: { idPlayer1: "6485f060b33350a4c2f7b17b" },
  // });

  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className="relative bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center">
        <div className="w-full p-4 flex justify-between items-start absolute top-0">
          <DropdownMenu
            collapsedImageUrl="/images/MenuClose.png"
            expandedImageUrl="/images/MenuOpen.png"
          />
          <SoundButton
            initialImageUrl="/images/MusicOn.png"
            transitionImageUrl="/images/MusicTransition2.png"
            finalImageUrl="/images/MusicOff.png"
          />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow">
          <Image
            src="/images/QBTitle.png"
            alt="QuizBlitz"
            width={320}
            height={160}
            className="mb-56"
            draggable="false"
          />

          <PlayButton
            unpressedImageUrl="/images/Normal.png"
            pressedImageUrl="/images/Push.png"
            href="/game"
          />

          <Link
            href={"./currentGames"}
            className="w-32 h-10 mt-5 bg-[#8FDE5D] flex justify-center items-center text-lg text-white font-bold border-4 border-white "
          >
            Games
          </Link>
        </div>
      </div>
    </div>
  );
}
