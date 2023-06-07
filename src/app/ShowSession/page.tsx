import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserSession from "../components/UserSession";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      
      <pre>{JSON.stringify(session)}</pre>
      <UserSession />
    </section>
  );
}
