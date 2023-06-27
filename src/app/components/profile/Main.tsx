"use client";

import UpdateName from "./UpdateName";
import UploadAvatar from "./UpdateAvatar";
import { UpdateAvatar } from "@/app/profile/action";
import { useState } from "react";
import ShowUserInfo from "./ShowUserInfo";
import NavBarMenu from "../(NavBar)/NavBarMenu";
import { Game, User } from "@prisma/client";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";


interface Props {
  FinishedGames: Game[];
  loggedUser: User;
  FavoriteOpponent: User | null;
}

const Main: React.FC<Props> = ({
  FinishedGames,
  loggedUser,
  FavoriteOpponent,
}) => {
  const [username, setUsername] = useState(loggedUser.name as string);
  const [url, setUrl] = useState(loggedUser.image as string);

  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className=" bg-white w-full md:w-4/12 flex flex-col h-full bg-customBlue bg-cover bg-no-repeat bg-center justify-center items-center">

       <Image 
       src={"/images/Profile.png"} 
       alt="" width={200} 
       height={53} 
       sizes="100vh" 
       className="mt-16"
       />

        <section className="w-full flex-1 flex flex-col px-6">
          <div className="flex bg-[#D3AB6E] border-8  border-[#97605E] w-full h-min flex-col px-4 mt-10 rounded-lg">
            <ShowUserInfo
              email={loggedUser.email as string}
              name={username}
              image={url}
              id={loggedUser.id}
              FinishedGames={FinishedGames}
              FavoriteOpponent={FavoriteOpponent}
            />
          </div>
          <div className="flex flex-row w-full justify-center mt-2">
            <UpdateName setUser={setUsername} />
            <UploadAvatar email={loggedUser.email as string} setUrl={setUrl} />
          </div>
          <button
                className=" mt-2 border-4 flex justify-center items-center w-full h-10 rounded-xl text-2xl text-white font-bold border-red-500 bg-red-400 hover:bg-red-300 duration-300"
                onClick={() => signOut()}
              >
                {" "}
                Cerrar Sesión
          </button>
        </section>
        <NavBarMenu />
      </div>
    </div>
  );
};

export default Main;
