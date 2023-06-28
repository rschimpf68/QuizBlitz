import { Game, User } from "@prisma/client";
import Image from "next/image";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../../../public/fonts/font.ttf" });

export interface Props {
  image: string;
  name: string;
  id: string;
  FavoriteOpponent: User | null;
  email: string;

  FinishedGames: Game[];
}
const ShowUserInfo: React.FC<Props> = ({
  image,
  name,
  id,
  FinishedGames,
  FavoriteOpponent,
  email,
}) => {
  //Partidas jugadas, porcentaje de victorias, tu mayor adversario.
  //Partidas jugadas es FinishedGames, Partidas ganadas es WinnedGames, Victory Per Porcentaje de vitoria
  const WinnedGames = FinishedGames.filter((game) => game.WinnerId === id);
  const VictoryPer =
    FinishedGames.length > 0
      ? (WinnedGames.length / FinishedGames.length) * 100
      : 0;

  console.log(FinishedGames.length);
  return (
    <div>
      <div className=" py-2 rounded-xl flex mb-8">
        <Image
          src={image}
          alt=""
          width={128}
          height={128}
          sizes="100vh"
          className="rounded-xl"
        />
        <div className=" py-2 rounded-xl flex flex-col justify-center items-center">
          <div className={`${myFont.className} text-3xl text-white flex ml-4`}>
            Usuario: {name}
          </div>
        </div>
      </div>

      <div
        className={`${myFont.className} text-2xl text-white flex flex-col items-center`}
      >
        Partidas jugadas: {FinishedGames.length}
      </div>
      <div
        className={`${myFont.className} text-2xl text-white flex flex-col items-center`}
      >
        % de Victorias: {VictoryPer} %
      </div>
      <div
        className={`${myFont.className} text-2xl flex flex-col items-center mb-8 text-white`}
      >
        Oponente Favorito: {"  "}
        {FavoriteOpponent ? FavoriteOpponent.name : " X "}{" "}
        {FavoriteOpponent && (
          <Image
            src={FavoriteOpponent.image as string}
            alt=""
            width={48}
            height={48}
            className="rounded-lg ml-2"
          />
        )}
      </div>
    </div>
  );
};
export default ShowUserInfo;
