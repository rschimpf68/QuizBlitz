import { Answer, Category, Game, Round } from "@prisma/client";
import QuestionAndAnswers from "../../components/(GameComponents)/QuestionAndAnswers";
import client from "../../libs/prismadb";
import GameCard from "../../components/(GameComponents)/GameCard";
import { Randomize } from "../../../utils/utils";
import { useParams } from "next/navigation";
import React from "react";
import { QuestionWithAnswers } from "./action";

export const dynamic = "force-dynamic";

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await client.game.findUnique({
    where: { id: params.id },
    include: { Rounds: true },
  });

  const idPlayer = game?.Turn == 1 ? game?.idPlayer1 : game?.idPlayer2;

  const QuestionsPerGame = 10;
  const questions = await client.question.findMany({
    select: {
      id: true,
    },
  });

  const questionsId = Randomize(
    questions.map((x) => x.id),
    QuestionsPerGame
  );
  const NumberQuestions = 95;
  const randomIndex = Math.floor(Math.random() * NumberQuestions);
  const firstQuesiton = await client.question.findFirst({
    skip: randomIndex,
    select: {
      id: true,
      question: true,

      answers: {
        select: {
          id: true,
          answer: true,
        },
      },
    },
  });
  if (firstQuesiton?.answers)
    firstQuesiton.answers = Randomize(firstQuesiton.answers as Answer[], 4);

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-BlueBG">
      {
        <GameCard
          firstQuestion={firstQuesiton as QuestionWithAnswers}
          QuestionsPerGame={QuestionsPerGame}
          game={game as Game & { Rounds: Round[] }}
        />
      }
    </main>
  );
}
