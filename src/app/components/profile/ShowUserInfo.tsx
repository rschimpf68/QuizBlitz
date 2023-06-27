import { Game, User } from "@prisma/client";
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
        <img src={image} alt="" className="h-32 w-32" />
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
          <img
            src={FavoriteOpponent.image as string}
            alt=""
            className="h-12 w-12"
          />
        )}
      </div>
    </div>
  );
};
export default ShowUserInfo;
