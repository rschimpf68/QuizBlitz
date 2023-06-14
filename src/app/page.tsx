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
import NavBarMenu from "./components/NavBarMenu";

export default async function Home() {
  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className=" bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center">
        <div className="w-full p-4 flex justify-end items-start">
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
        <section className="flex  flex-col w-full  items-center  flex-grow">
          <div className="flex justify-center h-1/2 items-center w-full  ">
            <Image
              src="/images/QBTitle.png"
              alt="QuizBlitz"
              width={320}
              height={67}
              draggable="false"
            />
          </div>
          <div className="flex justify-center h-1/4 items-center w-full  ">
            <PlayButton
              unpressedImageUrl="/images/Normal.png"
              pressedImageUrl="/images/Push.png"
              href="/game"
            />
          </div>
          <section className="h-1/4  w-full flex items-end">
            <NavBarMenu />
          </section>
        </section>
      </div>
    </div>
  );
}
