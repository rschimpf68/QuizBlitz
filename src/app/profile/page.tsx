import UpdateName from "../components/profile/UpdateName";
import Header from "../components/profile/Header";
import UploadAvatar from "../components/profile/UpdateAvatar";
import client from "../libs/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Main from "../components/profile/Main"
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
    <div className="flex items-start justify-center h-screen bg-BlueBG">
      <div className=" bg-white w-full md:w-4/12 flex flex-col h-full bg-[url(/images/Background.gif)] bg-cover bg-no-repeat bg-center">
      <Main username={session?.user?.name as string} email={session?.user?.email as string} image={user?.image as string}/>
      </div>
    </div>
  );
}
