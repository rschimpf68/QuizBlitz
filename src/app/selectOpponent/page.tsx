import { getServerSession } from "next-auth";
import SelectOponent from "../components/selectOponent/SelectOponent";
import Sound from "../components/Sound";
import client from "../libs/prismadb";

import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import { Create, Delete } from "../libs/CreateQuestion";
import { newGame } from "./action";
import BackButton from "../components/buttons/B-Back";

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


      
      <div className=" bg-white w-full md:w-4/12 flex-col h-screen bg-customBlue bg-cover bg-no-repeat bg-center justify-center">
      <div className="fabsolute ml-6 top-0 left-0 right-0">

      <div className=" w-full md:w-4/12 flex-col h-screen bg-customBlue bg-cover bg-no-repeat bg-center justify-center">
        <div className="fabsolute ml-6 top-0 left-0 right-0">


          <BackButton
            unpressedImageUrl="/images/BackUnpressed.png"
            pressedImageUrl="/images/BackPressed.png"
            href="/"
            useLink={false}
          />
        </div>
        <section className="px-5 flex-1 justify-center items-center h-3/4">
          <SelectOponent
            firstUsers={users}
            usernamePlayer1={loggedUser?.name as string}
            idPlayer1={loggedUser?.id as string}
          />
        </section>
      </div>
    </div>
    </div>
    </div>
  );
}
