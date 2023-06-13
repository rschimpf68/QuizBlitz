import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserSession from "../components/UserSession";
import Header from "../components/Header";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <section>

      <Header />
      <section>
        <Link href={"/"}>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Update profile
          </button>
        </Link>
        <pre>{JSON.stringify(session)}</pre>

        <UserSession />
      </section>
    </section>
  );
}
