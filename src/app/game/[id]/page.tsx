import { Answer, Category, Game } from "@prisma/client";
import QuestionAndAnswers from "../../components/QuestionAndAnswers";
import client from "../../libs/prismadb";
import GameCard from "../../components/GameCard";
import { Randomize } from "@/utils/utils";
import { useParams } from "next/navigation";

async function updateGame(game: Game, points: number) {
  "use server";

  const update =
    game?.TurnId == game?.idPlayer1
      ? await client.game.update({
          where: { id: game?.id },
          data: { TurnId: game.idPlayer2, PointsP1: points },
        })
      : await client.game.update({
          where: { id: game?.id },
          data: { TurnId: game.idPlayer1, PointsP2: points },
        });
  console.log(update);
}

export default async function GamePage({ params }: { params: { id: string } }) {
  const game = await client.game.findUnique({ where: { id: params.id } });

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
    <main className="flex min-h-screen flex-col justify-center items-center w-full bg-blue-200">
      {
        <GameCard
          questions={finalQuestions}
          updateTurn={updateGame}
          game={game as Game}
        />
      }
    </main>
  );
}
