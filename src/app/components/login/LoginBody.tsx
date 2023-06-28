"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import localFont from "next/font/local";
import { motion } from "framer-motion";
const myFont = localFont({ src: "../../../../public/fonts/font.ttf" });

const LoginBody = () => {
  const session = useSession();
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [displayLoading, setDisplayLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      toast.success("Logeado exitosamente! Espera por favor");
      router.push("/");
    }
  });

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayLoading(true);
    signIn("credentials", { ...data }).then((callback) => {});
  };

  return (
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div
        className={`${myFont.className}bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center`}
      >
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="flex w-auto h-20 items-center justify-center">
                <div className="relative">
                  <Image
                    src="/images/Login-SignIn.png"
                    width={200}
                    height={100}
                    alt=""
                    quality={1}
                    sizes="100vh"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={loginUser}
              >
                <div>
                  <label
                    htmlFor="email"
                    className={`${myFont.className}block text-sm font-medium leading-6 text-gray-900`}
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={data.password}
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-QBDarkGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-QBGreen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-10 mb-2 text-center text-sm text-gray-500">
                No estás registrado?{" "}
                <a
                  href="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Registrate
                </a>
              </p>
              <button
                className="bg-gray-800 text-white hover:bg-gray-700 py-2 px-4 rounded w-full"
                onClick={() => signIn("github")}
              >
                <svg
                  className="w-5 h-5 inline-block mr-2"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 0C3.584 0 0 3.584 0 8c0 3.536 2.281 6.537 5.447 7.59.398.074.547-.173.547-.384v-1.341c-2.216.481-2.679-1.067-2.679-1.067-.363-.922-.884-1.17-.884-1.17-.72-.492.054-.483.054-.483.797.057 1.217.817 1.217.817.71 1.183 1.869.842 2.324.644.073-.517.278-.867.506-1.067-1.195-.136-2.446-.598-2.446-2.666 0-.589.209-1.07.552-1.446-.055-.136-.24-.683.053-1.425 0 0 .453-.144 1.48.552.428-.118.886-.177 1.34-.177.453 0 .912.059 1.34.177 1.027-.696 1.48-.552 1.48-.552.293.742.109 1.289.054 1.425.344.376.551.857.551 1.446 0 2.975-1.253 2.53-2.448 2.665.192.167.36.498.36 1.005v1.487c0 .212.149.459.549.384C13.719 14.537 16 11.536 16 8c0-4.416-3.584-8-8-8z"
                  />
                </svg>
                Iniciar sesión con GitHub
              </button>
              <button
                className="bg-red-600 text-white hover:bg-red-500 py-2 px-4 mt-4 rounded w-full flex items-center justify-center"
                onClick={() => signIn("google")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                    fill="white"
                  ></path>{" "}
                </svg>
                &nbsp;&nbsp;Iniciar sesión con Google        
              </button>
            </div>
          </div>
        </>
        {displayLoading && (
          <div className="w-full h-full fixed z-1 left-0 top-0  flex justify-center items-center flex-1 flex-grow">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Image
                src={"/images/Icon.png"}
                alt="QuizBlitz"
                width={70}
                height={70}
                draggable="false"
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginBody;
