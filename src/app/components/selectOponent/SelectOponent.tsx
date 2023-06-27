"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { findUser, newGame } from "../../selectOpponent/action";
import { User } from "@prisma/client";
import ShowUser from "./ShowUser";
import { GenericHTMLFormElement } from "axios";
import { useRouter } from "next/navigation";
import { Howl } from "howler";
interface Props {
  firstUsers: User[];
  usernamePlayer1: string;
  idPlayer1: string;
}
const SelectOponent: React.FC<Props> = ({
  firstUsers,
  usernamePlayer1,
  idPlayer1,
}) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false)
  const [users, setUsers] = useState(firstUsers);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();


  var sound = new Howl({
    src: ['/sounds/Click.wav']
  });
  if (clicked) sound.play()
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const resultUsers = await findUser(
      e.target.value.toString(),
      usernamePlayer1
    );
    setUsers(resultUsers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const gameId = await newGame(idPlayer1, selectedUser?.id as string);

    router.push(`/game/${gameId}`);
  };

  return (
    <>
      <div className="w-full bg-blue-600 rounded-xl min-h-full py-2 px-2 flex flex-col">
        <h1 className="text-white text-3xl text-center mb-2 font-bold">
          Seleccionar Oponente
        </h1>
        <section className="bg-white w-full h-full flex  flex-grow flex-col px-2 rounded-2xl py-2 items-stretch">
          <input
            type="text"
            className="w-full h-1/4  rounded-xl"
            placeholder="Buscar oponente"
            onChange={onChange}
          />
          <form onSubmit={handleSubmit}>
            <div className="overflow-auto h-96 ">
              <div className="grid grid-cols-3 grid-flow-row w-full justify-center items-center gap-4 my-2 p-2 overflow-x-hidden">
                <ShowUser
                  userSelected={selectedUser}
                  setUsuario={setSelectedUser}
                  index={1}
                />
                {users.length > 0 &&
                  users.map((user, index) => {
                    return (
                      <ShowUser
                        key={index}
                        userSelected={selectedUser}
                        setUsuario={setSelectedUser}
                        index={index}
                        user={user}
                      />
                    );
                  })}
              </div>
            </div>
            <button
              type="submit"
              className="py-6 border-4  flex justify-center items-center  w-full h-10 rounded-xl text-2xl text-white font-bold border-QBDarkGreen bg-QBGreen hover:bg-QBLightGreen duration-300"
              onClick={() => setClicked(!clicked)}
            >
              Jugar
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default SelectOponent;
