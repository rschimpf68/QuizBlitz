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
        className="mr-2 bg-orange-400 text-lg rounded-md font-bold text-white px-5"
      >
        Jugar
      </Link>
    ),
    [ModuleType.their]: (
      <Image
        src={"/images/clock.png"}
        alt=""
        width={20}
        height={20}
        className="mr-2"
      ></Image>
    ),
    [ModuleType.finished]:
      game.WinnerId == userId ? (
        <Image
          src={"/images/checked.png"}
          alt=""
          width={20}
          height={20}
          className="mr-2"
        />
      ) : (
        <Image
          src={"/images/close.png"}
          alt=""
          width={20}
          height={20}
          className="mr-2"
        />
      ),
  };
  const isPlayerOne = game.Player1.id === userId ? true : false;
  const OtherPlayer = isPlayerOne ? game.Player2 : game.Player1;
  return (
    <div className="h-16 w-full flex flex-row justify-between items-center bg-slate-100 rounded-md  ">
      <div className="h-10 w-10 bg-gray-200 rounded-3xl ml-2"></div>
      <div className="font-bold">
        {OtherPlayer ? OtherPlayer.name : "Random Oponent"}
      </div>
      <div>
        {game.Rounds.map((round, key) => {
          return (
            <section className="flex flex-col">
              <div id="key" className="text-center">{`R${key + 1}`}</div>
              <div>
                {isPlayerOne
                  ? ` (${round.PointsP1}-${round.PointsP2}) `
                  : ` (${round.PointsP2}-${round.PointsP1}) `}
              </div>
            </section>
          );
        })}
      </div>
      {classes[type]}
    </div>
  );
};

export default ShowGameResume;
