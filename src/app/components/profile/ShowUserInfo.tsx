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
      <div>
        <Image src={image} alt="" width={128} height={128} sizes="100vh" />
      </div>
      <div className={`${myFont.className} text-lg`}>{name}</div>
      <div className={`${myFont.className} text-lg`}>{email}</div>
      <div>Juegos Jugados: {FinishedGames.length}</div>
      <div>% de Victorias: {VictoryPer} %</div>
      <div className="flex flex-row items-center">
        Oponente Favorito:{" "}
        {FavoriteOpponent
          ? FavoriteOpponent.name
          : " No jugaste niguna partida aún"}
        {FavoriteOpponent && (
          <Image
            src={FavoriteOpponent.image as string}
            alt=""
            width={48}
            height={48}
          />
        )}
      </div>
    </div>
  );
};
export default ShowUserInfo;
