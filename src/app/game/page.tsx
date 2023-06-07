import { Answer, Category } from "@prisma/client";
import QuestionAndAnswers from "../components/QuestionAndAnswers";
import client from "../libs/prismadb";
import GameCard from "../components/GameCard";
import { Randomize } from "@/utils/utils";
export interface questionInterface {
  id: string;
  question: string;

  answers: Answer[];
}
export interface CreateQuestion {
  question: string;
  category: string;
  answer: string[];
}

export default async function Game() {
  const QuestionsPerGame = 10;
  let questions: questionInterface[] = await client.question.findMany({
    include: {
      answers: true,
    },
  });

  questions = Randomize(questions, QuestionsPerGame);

  for (const q of questions) {
    q.answers = Randomize(q.answers, 4);
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-blue-200">
      <GameCard questions={questions} />
    </main>
  );
}
