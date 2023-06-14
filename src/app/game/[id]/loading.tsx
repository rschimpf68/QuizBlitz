import Image from "next/image";
import Link from "next/link";
export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-BlueBG">
      <div className="flex min-h-screen w-4/12 bg-white px-10 justify-center items-center relative">
        <div className="inset-0 relative">
          <Image
            src="/images/FinalRes.png"
            alt="Fondo del div"
            width={900}
            height={600}
          />
        </div>
      </div>
    </main>
  );
}
