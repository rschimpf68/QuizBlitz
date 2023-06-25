import Image from "next/image";
import Link from "next/link";

interface Props {
  playerPoints: number;
}
const FinishedGame: React.FC<Props> = ({ playerPoints }) => {
  return (
    <div className="flex min-h-screen w-full md:w-4/12 bg-customBlue px-10 justify-center items-center relative">
      <div className="inset-0 relative">
        <Image
          src="/images/FinalRes.png"
          alt="Fondo del div"
          width={900}
          height={600}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <h1 className="text-6x1 text-white mx-4">
            Respondiste {playerPoints} preguntas correctamente
          </h1>
          <Link href={"/"} className="mt-10 w-40 bg-red-600 text-center">
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FinishedGame;
