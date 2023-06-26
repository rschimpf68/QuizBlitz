import UpdateName from "../components/profile/UpdateName";
import Header from "../components/profile/Header";
import UploadAvatar from "../components/profile/UpdateAvatar";
import client from "../libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const user = await client.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      name: true,
      image: true,
    },
  });

  return (
    <section>
      <Header username={user?.name as string} />
      <UpdateName />
      <UploadAvatar email={session?.user?.email as string} />
    </section>
  );
}
