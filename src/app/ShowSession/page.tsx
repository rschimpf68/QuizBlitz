import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserSession from "../components/UserSession";
import Header from "../components/Header";
import Head from "next/head";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  return (
    <section>
    
      <Header/>
      <pre>{JSON.stringify(session)}</pre>
      <UserSession />
    </section>
  );
}
