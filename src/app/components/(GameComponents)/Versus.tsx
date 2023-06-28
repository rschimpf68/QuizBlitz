import { Game, User } from "@prisma/client";

import UserGameDescription from "./UserGameDescription";
import Image from "next/image";
import StartButton from "../buttons/B-Start";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import SoundButton from "../buttons/B-Mute";
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
      <section className="flex flex-col items-center justify-center bg-customBlue  w-full md:w-4/12  min-h-screen overflow-hidden">
        <motion.div
          initial={{ y: -600 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-1/3 w-5/6 flex justify-center items-center"
        >
          <UserGameDescription
            username={
              PlayerIsPlayer1 ? game?.Player1.name : game?.Player2?.name
            }
            font={myFont}
            userImage={
              PlayerIsPlayer1 ? game?.Player1.image : game?.Player2?.image
            }
          />
        </motion.div>
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -600 }}
          className="w-full py-8 h-1/6 flex justify-center "
        >
          <Image
            src={"/images/Vsus.png"}
            alt="VS"
            width={112}
            height={112}
            quality={100}
            draggable="false"
          />
        </motion.div>
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: 600 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className=" h-1/3  w-5/6"
        >
          <UserGameDescription
            username={
              !PlayerIsPlayer1 ? game?.Player1.name : game?.Player2?.name
            }
            font={myFont}
            userImage={
              !PlayerIsPlayer1 ? game?.Player1.image : game?.Player2?.image
            }
            second={true}
          />
        </motion.div>

        <motion.div
          animate={{ x: 0 }}
          initial={{ x: 600 }}
          className="h-1/6 mt-10 w-full flex items-center justify-center"
        >
          <StartButton
            unpressedImageUrl="/images/StartN.png"
            pressedImageUrl="/images/StartP.png"
            onClick={onClick}
          />
        </motion.div>
      </section>
    </main>
  );
};
export default Versus;
