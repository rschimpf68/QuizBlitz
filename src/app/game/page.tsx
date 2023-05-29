import { Answer } from "@prisma/client";
import QuestionAndAnswers from "../components/QuestionAndAnswers";
import client from "../libs/prismadb";

export interface questionInterface {
  id: string;
  question: string;
  category: string;
  answers: Answer[];
}

export default async function Game() {
  // const user = await client.question.create({
  //   data: {
  //     question:
  //       "¿Qué actor interpreta al Joker en la película 'El caballero de la noche'?",
  //     category: "cine",
  //     answers: {
  //       create: [
  //         { answer: "Heath Ledger", correct: true },
  //         { answer: "Joaquin Phoenix", correct: false },
  //         { answer: "Jack Nicholson", correct: false },
  //         { answer: "Jared Leto", correct: false },
  //       ],
  //     },
  //   },
  // });
  const categories = ["ciencia", "cine"];
  const questions: questionInterface[][] = [];
  for (const cat of categories) {
    const newQuestions: questionInterface[] = await client.question.findMany({
      take: 2,
      where: {
        category: cat,
      },
      include: {
        answers: true,
      },
    });
    questions.push(newQuestions);
  }

  // Convertir el objeto en un array de arrays
  //

  return (
    <main className="flex min-h-screen flex-col items-center">
      <QuestionAndAnswers questions={questions} />
    </main>
  );
}
