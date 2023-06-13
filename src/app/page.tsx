import { User } from "@prisma/client";
import Link from "next/link";
import client from "./libs/prismadb";

import PlayButton from "./components/B-Play";
import SoundButton from "./components/B-Mute";
import DropdownMenu from "./components/B-Menu";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuth from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  // const deleteGame = await client.game.deleteMany({
  //   where: { idPlayer1: "6485f060b33350a4c2f7b17b" },
  // });

  return (
    <div className="flex items-start justify-center h-screen bg-blue-200">
      <div
        className="relative bg-white w-full md:w-4/12 flex flex-col h-full"
        style={{
          backgroundImage: 'url("/images/background.gif")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
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
          <img
            src="/images/QBTitle.png"
            alt="QuizBlitz"
            className="w-64 h-auto  mb-56"
          />
          <PlayButton
            unpressedImageUrl="/images/Normal.png"
            pressedImageUrl="/images/Push.png"
            href="/game"
          />
        </div>
      </div>
    </div>
  );
}
