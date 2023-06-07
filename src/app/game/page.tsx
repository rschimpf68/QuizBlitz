import { Answer, Category } from "@prisma/client";
import QuestionAndAnswers from "../components/QuestionAndAnswers";
import client from "../libs/prismadb";
import GameCard from "../components/GameCard";
import { Randomize } from "@/utils/utils";

export default async function Game() {
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
    include: {
      answers: true,
    },
  });

  for (const q of finalQuestions) {
    q.answers = Randomize(q.answers, 4);
  }
  finalQuestions;

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-blue-200">
      {<GameCard questions={finalQuestions} />}
    </main>
  );
}
