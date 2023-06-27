"use client";

import UpdateName from "./UpdateName";
import UploadAvatar from "./UpdateAvatar";
import Header from "./Header";
import { UpdateAvatar } from "@/app/profile/action";
import { useState } from "react";
import ShowUserInfo from "./ShowUserInfo";
import NavBarMenu from "../(NavBar)/NavBarMenu";
import { Game, User } from "@prisma/client";
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
      <div className=" bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center">
        {/* <Header username={user} image={url} /> */}
        <section className="w-full flex-1 flex-grow flex flex-row">
          <div className="w-1/2">
            <ShowUserInfo
              email={loggedUser.email as string}
              name={username}
              image={url}
              id={loggedUser.id}
              FinishedGames={FinishedGames}
              FavoriteOpponent={FavoriteOpponent}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <UpdateName setUser={setUsername} />
            <UploadAvatar email={loggedUser.email as string} setUrl={setUrl} />
          </div>
        </section>
        <NavBarMenu />
      </div>
    </div>
  );
};

export default Main;
