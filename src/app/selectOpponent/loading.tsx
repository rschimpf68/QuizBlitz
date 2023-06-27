import Image from "next/image";
import Link from "next/link";
export default function Loading() {
  const arr = [1, 2, 3, 4];
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-BlueBG">
      <div className="flex min-h-screen flex-col  w-full md:w-4/12   bg-customBlue px-10">
        <div className="w-full bg-blue-600 rounded-xl min-h-full py-2 px-2 flex flex-col">
          <h1 className="text-white text-3xl text-center mb-2 font-bold">
            Seleccionar Oponente
          </h1>
          <section className="bg-white w-full h-full flex  flex-grow flex-col px-2 rounded-2xl py-2 justify-center items-center">
            <div className="text-lg">Cargando...</div>
          </section>
        </div>
      </div>
    </main>
  );
}
