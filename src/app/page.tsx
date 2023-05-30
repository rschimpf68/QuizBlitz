import { User } from "@prisma/client";
import Link from "next/link";
import client from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]"
import UserSession from "./components/UserSession"

export default async function Home() {
  const session = await getServerSession(authOptions);

  const users: User[] = await client.user.findMany();
  // console.log(users);
  
  return (
    <section>
      <h1>Home page!</h1>
      <h2>Server side rendering: </h2>
      <h2>{JSON.stringify(session)}</h2>

      <h2>Client side rendering: </h2>
      <UserSession></UserSession>
    </section>
  );
}
