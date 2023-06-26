import Image from "next/image";
import Link from "next/link";
import MenuButton from "../buttons/B-Finish";

interface Props {
  playerPoints: number;
}
const FinishedGame: React.FC<Props> = ({ playerPoints }) => {
  return (
    <div className="flex min-h-screen w-full md:w-4/12 bg-customBlue px-10 justify-center items-center relative">
      <div className="inset-0 relative">
        <Image
          src="/images/FinalResult.png"
          alt="Fondo del div"
          width={900}
          height={600}
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
        <Image
            src="/images/Result.png"
            width={200}
            height={100}
            alt=""
            quality={1}
            sizes="100vh"
        />
          <h1 className="text-xl text-white mt-8 mx-4 font-bold">
            Preguntas correctas: {playerPoints}
          </h1>
          <MenuButton
              href="/"
              unpressedImageUrl="/images/MenuUnpressed.png"
              pressedImageUrl="/images/MenuPressed.png"
              useLink={false}
            />
        </div>
      </div>
    </div>
  );
};
export default FinishedGame;
