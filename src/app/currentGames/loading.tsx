import NavBarMenu from "../components/NavBarMenu";
import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  return (
    <main className="w-full  flex flex-col justify-center items-center bg-BlueBG min-h-screen">
      <section className="min-h-screen w-4/12 bg-[url(/images/Background.gif)] md:w-4/12 flex flex-col">
        <section className=" px-2 flex flex-grow flex-col pt-3 overflow-auto">
          <div className="flex flex-1 flex-col justify-center items-center flex-grow px-2"></div>
        </section>
        <section className="w-full flex items-end h-auto">
          <NavBarMenu />
        </section>
      </section>
    </main>
  );
}
