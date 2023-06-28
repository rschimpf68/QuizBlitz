import { Game, Round, User } from "@prisma/client";
import Link from "next/link";
import { FunctionComponent } from "react";
import { ModuleType } from "./ModuleShowGame";
import Image from "next/image";

type Props = {
  game: Game & {
    Player1: User;
    Player2: User | null;
    Rounds: Round[];
  };
  userId?: string;
  type: ModuleType;
};

const ShowGameResume: FunctionComponent<Props> = ({ game, userId, type }) => {
  const classes = {
    [ModuleType.your]: (
      <Link
        href={`/game/${game.id}`}
        className="bg-orange-400 text-lg rounded-md font-bold text-white px-4 mr-2"
      >
        Jugar
      </Link>
    ),
    [ModuleType.their]: (
      <Image
        src={"/images/clock.png"}
        alt=""
        width={25}
        height={25}
        className="mr-2"
        quality={1}
      ></Image>
    ),
    [ModuleType.finished]:
      game.WinnerId == userId ? (
        <Image
          src={"/images/checked.png"}
          alt=""
          width={25}
          height={25}
          className="mr-2"
          quality={1}
        />
      ) : (
        <Image
          src={"/images/close.png"}
          alt=""
          width={25}
          height={25}
          className="mr-2"
          quality={1}
        />
      ),
  };
  const isPlayerOne = game.Player1.id === userId ? true : false;
  const OtherPlayer = isPlayerOne ? game.Player2 : game.Player1;
  const rounds = game.Rounds;
  console.log("ASads");
  const src = OtherPlayer
    ? OtherPlayer.image
    : "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Bella";
  return (
    <div className="h-16 w-full flex flex-row items-center bg-slate-100 rounded-md  ">
      <div className="h-auto w-1/6">
        <Image
          src={src as string}
          height={48}
          width={48}
          alt=""
          className="rounded-lg"
        />
      </div>
      <div className="font-bold  flex-grow  p-1 ">
        {OtherPlayer ? OtherPlayer.name : "Oponente Aleatorio"}
      </div>
      <div className="flex flex-row justify-start   w-1/3">
        {rounds.map((round, index) => {
          return (
            <>
              {rounds.length - index < 4 && (
                <section className="flex flex-col mx-1" key={index}>
                  <div className="text-center font-bold">{`R${index + 1}`}</div>
                  <div>
                    {isPlayerOne
                      ? ` (${round.PointsP1}-${round.PointsP2}) `
                      : ` (${round.PointsP2}-${round.PointsP1}) `}
                  </div>
                </section>
              )}
            </>
          );
        })}
      </div>
      <div className=" w-1/5 flex justify-center">{classes[type]}</div>
    </div>
  );
};

export default ShowGameResume;
