import { Answer, Category, Game, Round } from "@prisma/client";
import QuestionAndAnswers from "../../components/QuestionAndAnswers";
import client from "../../libs/prismadb";
import GameCard from "../../components/GameCard";
import { Randomize } from "../../../utils/utils";
import { useParams } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await client.game.findUnique({
    where: { id: params.id },
    include: { Rounds: true },
  });

  const idPlayer =
    game?.TurnId == game?.idPlayer1 ? game?.idPlayer1 : game?.idPlayer2;

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

  const finalQuestions = await client.question.findMany({
    where: {
      id: { in: questionsId },
    },
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

  for (const q of finalQuestions) {
    q.answers = Randomize(q.answers, 4);
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-BlueBG">
      {
        <GameCard
          questions={finalQuestions}
          game={game as Game & { Rounds: Round[] }}
        />
      }
    </main>
  );
}
