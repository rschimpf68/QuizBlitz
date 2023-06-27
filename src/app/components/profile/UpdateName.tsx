"use client";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import Router from "next/router";

interface Props {
  setUser: Dispatch<SetStateAction<string>>;
}
const UpdateName: React.FC<Props> = ({ setUser }) => {
  // const router = useRouter()
  const { data: session, update } = useSession();
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/api/updateUser", data)
      .then(() => {
        update({
          ...session,
          user: {
            ...session?.user,
            name: data.name,
          },
        });
        setUser(data.name);
        toast.success("Nombre correctamente actualizado");
      })
      .catch(() => toast.error("Algo salió mal..."));
  };
  return (
    <div className="flex flex-col px-6">
            <label className="font-bold">Actualizar Nombre</label>
        <form className="" action="#" method="POST" onSubmit={updateUser}>
            <div className="">
              <input
                id="name"
                name="name"
                onChange={function (e) {
                  setData({ ...data, name: e.target.value });
                }}
                placeholder="Nuevo nombre..."
                type="text"
                className=" w-full rounded-md border-0 text-gray-900 placeholder:text-gray-400"
              />
          </div>


        </form>
        <div>
            <button
              type="submit"
              onClick={() =>
                setData({ ...data, email: session?.user?.email as string })
              }
              className="flex w-full border-4 mt-2 justify-center items-center h-auto rounded-xl text-white font-bold border-QBDarkGreen bg-green-200 hover:bg-QBLightGreen duration-300"
            >
              Actualizar Nombre
            </button>
          </div>
      </div>
  );
};

export default UpdateName;
