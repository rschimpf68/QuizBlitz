import { Game, Round, User } from "@prisma/client";
import { type } from "os";
import { FunctionComponent } from "react";
import ShowGameResume from "./ComponentShowGameResume";

export enum ModuleType {
  your,
  their,
  finished,
}
const classes = {
  [ModuleType.your]: "bg-green-600",
  [ModuleType.their]: "bg-orange-400",
  [ModuleType.finished]: "bg-red-600",
};

type Props = {
  games?: (Game & {
    Player1: User;
    Player2: User | null;
    Rounds: Round[];
  })[];
  text: string;
  type: ModuleType;
  userId?: string;
};

const ModuleShowGame: FunctionComponent<Props> = ({
  games,
  text,
  type,
  userId,
}) => {
  return (
    <div
      className={`${classes[type]} h-auto  w-full  flex flex-col justify-center items-center px-2 pb-2 rounded-lg my-3`}
    >
      <div className="text-white flex justify-center text-lg items-center font-bold">
        {text}
      </div>

      <div className={"w-full h-full bg-white rounded-lg"}>
        {games?.map((game, key) => {
          return (
            <ShowGameResume key={key} game={game} userId={userId} type={type} />
          );
        })}
      </div>
    </div>
  );
};

export default ModuleShowGame;
