"use client";
import { ChangeEvent, useState } from "react";
import { findUser, newGame } from "../../inviteUser/action";
import { User } from "@prisma/client";
import ShowUser from "./ShowUser";
import { GenericHTMLFormElement } from "axios";
import { useRouter } from "next/navigation";
interface Props {
  firstUsers: User[];
  idPlayer1: string;
}
const SelectOponent: React.FC<Props> = ({ firstUsers, idPlayer1 }) => {
  const router = useRouter();
  const [users, setUsers] = useState(firstUsers);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const resultUsers = await findUser(e.target.value.toString());
    setUsers(resultUsers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      const gameId = await newGame(idPlayer1, selectedUser?.id as string);

      router.push(`/game/${gameId}`);
    }
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
              <div className="grid grid-cols-3 grid-flow-row w-full justify-center items-center gap-4 my-2 ">
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
              className=" border-4 border-gray-200 flex justify-center items-center bg-orange-500 w-full h-10 rounded-xl text-2xl text-white font-bold hover:bg-orange-400"
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
