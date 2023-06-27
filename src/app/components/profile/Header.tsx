"use client";
import prisma from "../../libs/prismadb";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import axios from "axios";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import path from "path";

interface Props {
  username: string;
  image: string;
}

const Header: React.FC<Props> = ({ username, image }) => {
  const { data: session, status, update } = useSession();

  // const router = useRouter()
  // const [username, setUsername] = useState(session?.user?.name)

  // useEffect(() => {
  //   setUsername(session?.user?.name)
  // }, [session])

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex items-center space-x-2 ml-auto">
            {status == "authenticated" && (
              <button
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                onClick={() => signOut()}
              >
                {" "}
                Sign out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
