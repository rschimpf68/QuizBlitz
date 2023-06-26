"use client";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateName() {
  const { data: session, update } = useSession();
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const router = useRouter();
  const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/api/updateUser", data)
      .then(() => {
        router.refresh();
        toast.success("Nombre correctamente actualizado");
      })
      .catch(() => toast.error("Algo salió mal..."));
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={updateUser}
        >
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                onChange={function (e) {
                  setData({ ...data, name: e.target.value });
                }}
                placeholder={session?.user?.name as string}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={() =>
                setData({ ...data, email: session?.user?.email as string })
              }
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
