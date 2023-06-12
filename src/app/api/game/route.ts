import { NextResponse } from "next/server";
import { Randomize } from "@/utils/utils";
import client from "../../libs/prismadb";
export async function GET() {
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
  return NextResponse.json(finalQuestions);
}