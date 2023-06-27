"use client";

import { QuestionWithAnswers } from "@/app/game/[id]/action";
import { Game, Round, User } from "@prisma/client";

import GameCard from "./GameCard";
import Versus from "./Versus";
import { useState } from "react";
import FinishedGame from "./FinishedGame";
import SoundButton from "../buttons/B-Mute";
import Sound from "../Sound";
interface Props {
  game:
    | (Game & {
        Player1: User;
        Player2: User | null;
        Rounds: Round[];
      })
    | null;
  loggedPlayer: User;
  firstQuestion: QuestionWithAnswers;
  gameState: number;
  QuestionsPerGame: number;
  IdAnsweredQuestions: string[];
}
const ManageScreens: React.FC<Props> = ({
  game,
  loggedPlayer,
  firstQuestion,
  QuestionsPerGame,
  gameState,
  IdAnsweredQuestions,
}) => {
  const [GameState, SetGameState] = useState(gameState);
  const [PlayerPoints, setPlayerPoints] = useState(0);
  const [MessageEndGame, setMessageEndGame] = useState(
    "¡Se te acabó el tiempo!"
  );
  const [AnsweredQuestions, setAnsweredQuestions] =
    useState(IdAnsweredQuestions);
  const [Answers, setAnswers] = useState<boolean[]>(new Array());
  const [musicSound, setMusicSound] = useState(false);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-BlueBG">
      <SoundButton
        initialImageUrl="/images/MusicOn.png"
        transitionImageUrl="/images/MusicTransition2.png"
        finalImageUrl="/images/MusicOff.png"
      />
      {GameState == 1 ? (
        <GameCard
          firstQuestion={firstQuestion as QuestionWithAnswers}
          QuestionsPerGame={QuestionsPerGame}
          game={game as Game & { Rounds: Round[] }}
          setGameState={SetGameState}
          setPlayerPoints={setPlayerPoints}
          playerPoints={PlayerPoints}
          setMessageEndGame={setMessageEndGame}
          setAnsweredQuestions={setAnsweredQuestions}
          AnsweredQuestions={AnsweredQuestions}
          answer={Answers}
          setAnswer={setAnswers}
        />
      ) : GameState == 0 ? (
        <Versus
          game={game}
          loggedPlayer={loggedPlayer as User}
          setGameState={SetGameState}
        />
      ) : (
        <FinishedGame playerPoints={PlayerPoints} message={MessageEndGame} />
      )}
    </main>
  );
};
export default ManageScreens;
