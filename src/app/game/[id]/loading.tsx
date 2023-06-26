import Image from "next/image";
import Link from "next/link";
export default function Loading() {
  const arr = [1, 2, 3, 4];
  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-BlueBG">
      <div className="flex min-h-screen flex-col  w-full md:w-4/12   bg-customBlue px-10">
        {/* <div className="mb-5 flex h-1/4 w-full justify-center items-center mt-5 relative">
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <Image
              src="/images/Tempo.png"
              alt="Imagen"
              width={750}
              height={231}
            />
          </div>
          <div className="h-auto w-full border-lime-100 flex flex-col justify-center items-center text-6xl text-black font-bold mt-6 px-5 relative z-10">
            Terminado
          </div>
        </div>

        <div className="w-full h-auto flex-col justify-center items-center mt-8 relative overflow-hidden">
          <Image
            src="/images/GameCard.png"
            alt="Imagen de fondo"
            width={650}
            height={1000}
            quality={5}
          />
          <div className="absolute top-4 left-0 w-full h-full flex-col justify-center items-center">
            <div className="mb-8 mt-4 flex h-auto w-4/5 mx-auto justify-center text-center text-2xl font-bold">
              Cargando
            </div>
            <div className="w-4/5 justify-center mx-auto">
              {arr.map((key) => {
                return (
                  <div key={key}>
                    <button
                      className={` my-5 flex  w-full items-center justify-center rounded-md border-2 py-4 text-lg  text-black outline-none transition-all duration-200 hover:scale-105 disabled:pointer-events-none  ${"bg-white"}`}
                    >
                      Espere
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
