import { User } from "@prisma/client";
import Link from "next/link";
import client from "../../lib/prisma";
export default async function Home() {
  const users: User[] = await client.user.findMany();
  console.log(users);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="./game">partida</Link>
    </main>
  );
}
