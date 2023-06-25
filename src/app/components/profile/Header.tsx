'use client'
import prisma from "../../libs/prismadb";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import axios from "axios";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

interface Props {
  username : string
}

const Header: React.FC<Props> =  ({username}) => {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">

          <div className="flex items-center space-x-2 ml-auto">
            
            {status == "authenticated" &&
               <button className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300" onClick={() => signOut()}> Sign out</button>
            }
            
            {status == "authenticated" &&
               <Link href="/">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full"
                  
                  src={session.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48Ke_Q2uphy_MQect9sVe9j0zRyea2Kp26g"} 
                />
                <div className="space-y-1 font-medium">
                  <p>
                    {username}
                    <time className="block text-sm text-gray-500 dark:text-gray-400">
                    {session.user?.email}
                    </time>
                  </p>
                </div>
              </div>
            </Link>
            }
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;