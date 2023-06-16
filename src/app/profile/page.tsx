'use client'

import { useState } from 'react';
import { useSession } from "next-auth/react";
import Header from "../components/profile/Header";
import axios from "axios";
import { toast } from 'react-hot-toast';

export default function Profile() {
  const { data: session, status } = useSession()
  const [update, setUpdate] = useState(false)

  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const updateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.post('/api/updateUser', data)
      .then(() => {
        toast.success("Usuario correctamente registrado!")
      })
      .catch(() => toast.error("Algo salió mal..."));
  }
  return (
    <section>

      <Header />

      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => setUpdate(!update)}
      >
        Update profile
      </button>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={updateUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder={session?.user?.email || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>



            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>

              </div>

              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder={session?.user?.name || ""}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

              </div>

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

            </div>

            <div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update User
              </button>

            </div>
          </form>

        </div>
      </div>

    </section>
  );
}
