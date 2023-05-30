import { Answer, Category } from "@prisma/client";
import QuestionAndAnswers from "../components/QuestionAndAnswers";
import client from "../libs/prismadb";

export interface questionInterface {
  id: string;
  question: string;
  category: Category;
  answers: Answer[];
}
export interface CreateQuestion {
  question: string;
  category: string;
  answer: string[];
}
function Randomize(arr: any[], count: number): any[] {
  const randomItems: any[] = [];

  const copyArray = [...arr];
  if (count > copyArray.length) {
    throw new Error("Count cannot be greater than the array length");
  }
  // Select random items until the desired count is reached
  while (randomItems.length < count) {
    const randomIndex = Math.floor(Math.random() * copyArray.length);
    const randomItem = copyArray.splice(randomIndex, 1)[0];
    randomItems.push(randomItem);
  }
  return randomItems;
}

export default async function Game() {
  let categories = await client.category.findMany();
  const QuestionsPerCategorie = 3;
  const CategoriePerGame = 5;
  categories = Randomize(categories, CategoriePerGame);

  const questions: questionInterface[][] = [];
  for (const cat of categories) {
    let newQuestions: questionInterface[] = await client.question.findMany({
      where: {
        idCategory: cat.id,
      },

      include: {
        answers: true,
        category: true,
      },
    });
    newQuestions = Randomize(newQuestions, QuestionsPerCategorie);

    for (const NQ of newQuestions) {
      NQ.answers = Randomize(NQ.answers, 3);
    }
    questions.push(newQuestions);
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <QuestionAndAnswers questions={questions} />
    </main>
  );
}
