import NavBarMenu from "@/app/components/(NavBar)/NavBarMenu";
import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="w-full  flex flex-col justify-center items-center bg-BlueBG min-h-screen">
      <section className="min-h-screen  bg-[url(/images/Background.gif)] w-full md:w-4/12 flex flex-col">
        cargando
      </section>
    </main>
  );
}
