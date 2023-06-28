import { Game, Round, User } from "@prisma/client";
import client from "../../libs/prismadb";
import React from "react";
import { QuestionWithAnswers, checkAnswerGetNextQuestion } from "./action";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ManageScreens from "@/app/components/(GameComponents)/MangeScreens";
export const dynamic = "force-dynamic";
import Sound from "../../components/Sound";

export default async function GamePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  let [game, loggedUser] = await Promise.all([
    client.game.findUnique({
      where: { id: params.id },
      include: { Rounds: true, Player1: true, Player2: true },
    }),
    client.user.findUnique({
      where: { email: session?.user?.email as string },
    }),
  ]);

  const PlayerIsPlayer1 = game?.Player1.id == loggedUser?.id;
  //Solve Bug constatly redirecting.
  if (
    (PlayerIsPlayer1 && game?.Turn != 1) ||
    (!PlayerIsPlayer1 && game?.Turn != 2)
  ) {
    const games = await client.game.update({
      where: { id: game?.id },
      data: { TurnIsOver: true },
    });
  }
  //Check if a user who's not the Player that has to play is tryng to play.
  if (
    (loggedUser?.id != game?.Player1.id &&
      loggedUser?.id! != game?.Player2?.id) ||
    (PlayerIsPlayer1 && game?.Turn != 1) ||
    (!PlayerIsPlayer1 && game?.Turn != 2)
  ) {
    redirect("/");
  }
  // Starting Turn
  if (PlayerIsPlayer1 && game?.TurnIsOver) {
    const GameNewRoundAdded = await client.game.update({
      where: { id: game?.id },
      data: {
        Rounds: {
          create: {
            PointsP1: 0,
            PointsP2: 0,
          },
        },
      },
      include: {
        Rounds: true,
      },
    });
    game?.Rounds.push(
      GameNewRoundAdded.Rounds[GameNewRoundAdded.Rounds.length - 1]
    );
  }

  //Solving reloading/ exiting game problem
  let firstQuestion: QuestionWithAnswers;
  let AnsweredQuestions = new Array<string>();

  let gameState: number;
  //Si es la primera vez que está jugando.
  if (game?.TurnIsOver) {
    const [notIntereted, question] = await checkAnswerGetNextQuestion(
      "64740ac48ae34295a400fe35",
      [],
      game as Game & { Rounds: Round[] }
    );
    const update = await client.game.update({
      where: {
        id: game?.id as string,
      },
      data: {
        TurnIsOver: false,
      },
    });
    firstQuestion = question;
    gameState = 0;
  } else {
    const question = await client.question.findUnique({
      where: { id: game?.CurrentQuestionId as string },
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
    firstQuestion = question as QuestionWithAnswers;
    AnsweredQuestions = game?.IdAnsweredQuestions as string[];
    gameState = 1;
  }
  const QuestionsPerGame = 5 - AnsweredQuestions.length;

  return (
    <>
      <ManageScreens
        game={game}
        gameState={gameState}
        loggedPlayer={loggedUser as User}
        QuestionsPerGame={QuestionsPerGame}
        firstQuestion={firstQuestion}
        IdAnsweredQuestions={AnsweredQuestions}
      />
    </>
  );
}
