

import UpdateName from "../components/profile/UpdateName";
import Header from "../components/profile/Header";
import client from "../libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Profile() {
  const session = await getServerSession(authOptions)
  console.log(session?.user?.email)
  const user = await client.user.findUnique({
    where: {
      email: session?.user?.email
    },
    select: {
      name: true
    }
  })
  
  
  return (
    <section>

      <Header  username={user?.name || ""}/>
      <UpdateName />
      
      
    </section>
  );
}
