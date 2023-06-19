import { Answer, Category, Game, Round } from "@prisma/client";
import QuestionAndAnswers from "../../components/(GameComponents)/QuestionAndAnswers";
import client from "../../libs/prismadb";
import GameCard from "../../components/(GameComponents)/GameCard";
import { Randomize } from "../../../utils/utils";
import { useParams } from "next/navigation";
import React from "react";
import { QuestionWithAnswers, checkAnswerGetNextQuestion } from "./action";

export const dynamic = "force-dynamic";

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await client.game.findUnique({
    where: { id: params.id },
    include: { Rounds: true },
  });

  const idPlayer = game?.Turn == 1 ? game?.idPlayer1 : game?.idPlayer2;

  const QuestionsPerGame = 10;

  const [notIntereted, firstQuestion] = await checkAnswerGetNextQuestion();

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-BlueBG">
      {
        <GameCard
          firstQuestion={firstQuestion as QuestionWithAnswers}
          QuestionsPerGame={QuestionsPerGame}
          game={game as Game & { Rounds: Round[] }}
        />
      }
    </main>
  );
}
