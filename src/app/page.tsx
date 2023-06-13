import { User } from "@prisma/client";
import Link from "next/link";
import client from "./libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuth from "next-auth/next";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

export default async function Home() {
  // const users: User[] = await client.user.findMany();

  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/login");
  // }
  
  return (
    <div className="flex items-start justify-center h-screen bg-blue-200">
      <div className="flex flex-col items-center bg-white w-4/12 h-full">
        <div className="w-full p-4 flex justify-between items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            ☰
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            ♫
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-52">QuizBlitz</h1>

          <Link
            href="./game"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 w-40 px-4 rounded block text-center mb-10"
          >
            Play Now
          </Link>
          <Link
            href="./currentGames"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded block text-center w-40"
          >
            Games
          </Link>
        </div>
      </div>
    </div>
  );
}
