import { getServerSession } from "next-auth";
import SelectOponent from "../components/selectOponent/SelectOponent";

import client from "../libs/prismadb";

import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import { Create, Delete } from "../libs/CreateQuestion";
import { newGame } from "./action";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const loggedUser = await client.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  const users = await client.user.findMany({
    take: 12,
    where: {
      NOT: {
        id: loggedUser?.id,
      },
    },
  });
  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className=" bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center justify-center">
        <Link href={"../"} className="w-10 h-10">
          <Image
            src={"/images/LeftArrow.png"}
            alt=""
            width={40}
            height={40}
          ></Image>
        </Link>
        <section className="px-5 flex justify-center items-center h-3/4">
          <SelectOponent
            firstUsers={users}
            idPlayer1={loggedUser?.id as string}
          />
        </section>
      </div>
    </div>
  );
}
