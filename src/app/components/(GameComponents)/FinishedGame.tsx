import Image from "next/image";
import Link from "next/link";
import MenuButton from "../buttons/B-Finish";

interface Props {
  playerPoints: number;
  message: string;
}
const FinishedGame: React.FC<Props> = ({ playerPoints, message }) => {
  return (
    <div className="flex min-h-screen w-full md:w-4/12 bg-customBlue px-10 justify-center items-center relative">
      <section>
        <section className="flex bg-[#D3AB6E] border-8  border-[#97605E] w-full h-auto flex-col justify-center items-center mt-10 rounded-lg py-2">
          <div className="w-full h-auto flex justify-center items-center border-b-8 border-[#97605E]  ">
            <Image
              src="/images/Result.png"
              width={250}
              height={150}
              alt=""
              quality={1}
              sizes="100vh"
            />
          </div>
          <div className="text-xl text-white mt-8 mx-4 font-bold">
            <h1>Se te acabó el tiempo</h1>
            <h1>
              Respondiste {playerPoints}
              {playerPoints == 1
                ? " Pregunta correcta"
                : " Preguntas correctas"}{" "}
            </h1>
          </div>
          <div className="w-full h-auto flex justify-center items-center">
            <MenuButton
              href="/"
              unpressedImageUrl="/images/MenuUnpressed.png"
              pressedImageUrl="/images/MenuPressed.png"
              useLink={false}
            />
          </div>
        </section>
      </section>
    </div>
  );
};
export default FinishedGame;
