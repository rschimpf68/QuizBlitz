"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const Header =  () => {
   
  const { data: session } = useSession()
  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">

          <div className="flex items-center space-x-2 ml-auto">
            
            {!session ? (
               <Link
               href="/login"
               className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
             >
               <i className="text-gray-400 w-5 fa fa-user"></i>
               <span className="hidden lg:inline ml-1">Sign in</span>
             </Link>
            ) : (
               <button className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300" onClick={() => signOut()}> Sign out</button>
            )}
            
            {!session ? (
               <Link href="/me">
               <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                 <img
                   className="w-10 h-10 rounded-full"
                   src="https://img.icons8.com/ios_filled/12x/user-not-found.png"
                 />
                 <div className="space-y-1 font-medium">
                   <p>
                     Not logged
                     <time className="block text-sm text-gray-500 dark:text-gray-400">
                       not@logged.com
                     </time>
                   </p>
                 </div>
               </div>
             </Link>
            ) :  (
               <Link href="/">
              <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full"
                  
                  src={session.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48Ke_Q2uphy_MQect9sVe9j0zRyea2Kp26g"} 
                />
                <div className="space-y-1 font-medium">
                  <p>
                    {session.user?.name}
                    <time className="block text-sm text-gray-500 dark:text-gray-400">
                    {session.user?.email}
                    </time>
                  </p>
                </div>
              </div>
            </Link>
            )}
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