"use server";
import client from "@/app/libs/prismadb";
import { Randomize } from "@/utils/utils";
import { Answer, Game, Round } from "@prisma/client";
import next from "next/types";

export interface QuestionWithAnswers {
   question: string;
   id: string;
   answers: {
      answer: string;
      id: string;
   }[];

}
export async function updateGame(
   game: Game & { Rounds: Round[] },
   points: number
) {

   if (game?.Turn == 1) {
      const turn = game?.idPlayer2 ? 2 : 0;
      const update = await client.game.update({
         where: { id: game.id },
         data: {
            Turn: turn,
            Rounds: {
               create: {
                  PointsP1: points,
                  PointsP2: 0,
               },
            },
         },
      });


   } else {

      game.Rounds[game.Rounds.length - 1].PointsP2 = points;
      const currentRound = game.Rounds[game.Rounds.length - 1];
      const winner =
         game.Rounds.length > 2
            ? checkWhoWon(game.Rounds, game.idPlayer1, game.idPlayer2 as string)
            : null;

      const isOver = winner ? true : false;

      const [UpdateRound, UpdateGame] = await Promise.all([
         await client.round.update({
            where: { id: currentRound.id },
            data: { PointsP2: points },
         }),
         await client.game.update({
            where: { id: game?.id },
            data: { Turn: 1, Over: isOver, WinnerId: winner },
         }),
      ]);
   }
}
function checkWhoWon(rounds: Round[], p1: string, p2: string): string | null {
   let roundsP1 = 0;
   let roundsP2 = 0;

   rounds.forEach((round) => {
      if (round.PointsP1 > round.PointsP2) {
         roundsP1++;
      } else if (round.PointsP2 > round.PointsP1) {
         roundsP2++;
      }
   });

   if (roundsP1 > roundsP2) {
      return p1;
   } else if (roundsP2 > roundsP1) {
      return p2;
   } else {
      return null;
   }
}
export async function checkAnswerGetNextQuestion(answerId: string = "64740ac38ae34295a400fe34", IdQuestionsAnswered: string[] = []): Promise<[
   boolean, QuestionWithAnswers]> {
   const NumberQuestions = 90
   const randomIndex = Math.floor(Math.random() * (NumberQuestions - IdQuestionsAnswered.length));
   const [answerIsCorrect, nextQuestion] = await Promise.all([
      client.answer.findUnique({
         select: {
            correct: true,
         },
         where: {
            id: answerId as string,
         },
      }),
      client.question.findFirst({
         where: {
            NOT: {
               id: { in: IdQuestionsAnswered },
            }
         },
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
      })

   ]);
   if (nextQuestion?.answers) nextQuestion.answers = Randomize(nextQuestion.answers as Answer[], 4);

   const result = answerIsCorrect?.correct as boolean;
   return [result, nextQuestion as QuestionWithAnswers]
}
