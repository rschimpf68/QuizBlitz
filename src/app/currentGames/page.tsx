import { User, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import client from "../libs/prismadb";
import Email from "next-auth/providers/email";
import UserGameDescription from "../components/(GameComponents)/UserGameDescription";
import { Game, Round } from "@prisma/client";
import Link from "next/link";
import ModuleShowGame, {
  ModuleType,
} from "../components/(ShowCurrentGames)/ModuleShowGame";
import { Module } from "module";
import Image from "next/image";
import AllModulesShowGame from "../components/(ShowCurrentGames)/AllModulesShowGame";
import NavBarMenu from "../components/(NavBar)/NavBarMenu";
import { GetGamesByPlayerId } from "./action";
import { SWRConfig } from "swr";
import BackButton from "../components/buttons/B-Back";

export default async function PreGame() {
  const session = await getServerSession(authOptions);
  let gameId: string;
  const playerId = await client.user.findUnique({
    where: { email: session?.user?.email as string },
    select: { id: true },
  });

  return (
    <main className=" flex flex-col justify-center items-center bg-BlueBG h-screen">
      <section className="min-h-screen w-full  bg-[url(/images/Background.gif)] md:w-4/12 flex flex-col">
        <section className=" px-2 flex flex-grow flex-col pt-3 overflow-auto">
          <div className="flex flex-1 flex-col justify-center items-center flex-grow">
            <AllModulesShowGame PlayerId={playerId?.id} />
          </div>
        </section>
        <section className="w-full sticky bottom-0 z-50">
          <NavBarMenu />
        </section>
      </section>
    </main>
  );
}
