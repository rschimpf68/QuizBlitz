import { Prisma, Question } from "@prisma/client";
import client from "../../../lib/prisma";
export default async function Game() {
  const questions: Question[] = await client.question.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="min-h-screen w-5/12 bg-gray-100"></div>
    </main>
  );
}
