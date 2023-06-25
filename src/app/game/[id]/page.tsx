import { Answer, Category, Game, Round, User } from "@prisma/client";
import QuestionAndAnswers from "../../components/(GameComponents)/QuestionAndAnswers";
import client from "../../libs/prismadb";
import GameCard from "../../components/(GameComponents)/GameCard";
import { Randomize } from "../../../utils/utils";
import { useParams } from "next/navigation";
import Versus from "../../components/(GameComponents)/Versus";
import React from "react";
import { QuestionWithAnswers, checkAnswerGetNextQuestion } from "./action";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ManageScreens from "@/app/components/(GameComponents)/MangeScreens";

export const dynamic = "force-dynamic";

export default async function GamePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const [game, loggedUser] = await Promise.all([
    client.game.findUnique({
      where: { id: params.id },
      include: { Rounds: true, Player1: true, Player2: true },
    }),
    client.user.findUnique({
      where: { email: session?.user?.email as string },
    }),
  ]);
  const PlayerIsPlayer1 = game?.Player1.id == loggedUser?.id;
  if (
    (loggedUser?.id != game?.Player1.id &&
      loggedUser?.id! != game?.Player2?.id) ||
    (PlayerIsPlayer1 && game?.Turn != 1) ||
    (!PlayerIsPlayer1 && game?.Turn != 2)
  ) {
    redirect("/");
  }
  const QuestionsPerGame = 10;

  const [notIntereted, firstQuestion] = await checkAnswerGetNextQuestion();

  return (
    <>
      <ManageScreens
        game={game}
        loggedPlayer={loggedUser as User}
        QuestionsPerGame={QuestionsPerGame}
        firstQuestion={firstQuestion}
      />
    </>
  );
}
