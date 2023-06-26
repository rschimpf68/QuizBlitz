import { Game, User } from "@prisma/client";
import localFont from "next/font/local";
import UserGameDescription from "./UserGameDescription";
import Image from "next/image";
import StartButton from "../buttons/B-Start";
import { Dispatch, SetStateAction } from "react";
const myFont = localFont({ src: "../../../../public/fonts/font.ttf" });

export interface Props {
  game:
    | (Game & {
        Player1: User;
        Player2: User | null;
      })
    | null;

  loggedPlayer: User;
  setGameState: Dispatch<SetStateAction<number>>;
}
const Versus: React.FC<Props> = ({ game, loggedPlayer, setGameState }) => {
  const PlayerIsPlayer1 = game?.Player1.id == loggedPlayer?.id;
  const onClick = () => {
    setGameState(1);
  };
  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-BlueBG">
      <section className="flex flex-col items-center justify-center bg-customBlue  w-full md:w-4/12  min-h-screen">
        <div className="h-auto w-2/3 mt-36">
          <UserGameDescription
            username={
              PlayerIsPlayer1 ? game?.Player1.name : game?.Player2?.name
            }
            font={myFont}
          />
        </div>
        <div>
          <Image
            src={"/images/VS.png"}
            alt="VS"
            width={112}
            height={112}
            quality={1}
            sizes="100vh"
          />
        </div>
        <div className="h-auto w-2/3 pb-16">
          <UserGameDescription
            username={
              !PlayerIsPlayer1 ? game?.Player1.name : game?.Player2?.name
            }
            font={myFont}
          />
        </div>

        <div className="flex-grow" />

        <div className="mt-auto mb-16">
          <StartButton
            unpressedImageUrl="/images/StartN.png"
            pressedImageUrl="/images/StartP.png"
            onClick={onClick}
          />
        </div>
      </section>
    </main>
  );
};
export default Versus;
