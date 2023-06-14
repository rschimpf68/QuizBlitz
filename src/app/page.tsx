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
import { toast } from "react-hot-toast";
import Link from "next/link";

export default async function Home() {
  
  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className="relative bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center">
        <div className="w-full p-4 flex justify-between items-start absolute top-0">
          {/* <DropdownMenu
            collapsedImageUrl="/images/MenuClose.png"
            expandedImageUrl="/images/MenuOpen.png"
          /> */}
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
            height={67}
            className="mb-56"
            draggable="false"
          />

          <PlayButton
            unpressedImageUrl="/images/Normal.png"
            pressedImageUrl="/images/Push.png"
            href="/game"
          />
          {/* <div className="mt-5 w-auto h-auto">
            <PlayButton
              unpressedImageUrl="/images/Game_RE.png"
              pressedImageUrl="/images/Game_PR.png"
              href="./currentGames"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
