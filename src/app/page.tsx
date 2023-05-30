import { User } from "@prisma/client";
import Link from "next/link";
import client from "../../lib/prisma";
import UserSession from "./components/UserSession"

export default async function Home() {


  const users: User[] = await client.user.findMany();
  // console.log(users);
  
  return (
    <section>
      <h1>Home page!</h1>
    </section>
  );
}