"use client";
import { useCallback, useState } from "react";

import AnswerComponent from "./AnswerComponent";
import Timer from "./Timer";
import QuestionAndAnswers from "./QuestionAndAnswers";
import Link from "next/link";
import { Answer, Game, Question, Round } from "@prisma/client";
import { QuestionWithAnswers, updateGame } from "../../game/[id]/action";
import Image from "next/image";
interface Props {
  firstQuestion: QuestionWithAnswers;

  game: Game & { Rounds: Round[] };
  QuestionsPerGame: Number;
}

const GameCard: React.FC<Props> = ({
  firstQuestion,
  QuestionsPerGame,
  game,
}) => {
  //React States

  //GameOver
  const [finished, setFinished] = useState(false);
  //Questions Answered correctly by player
  const [playerPoints, setPlayerPoints] = useState(0);
  //Array of Answered questions by player
  const [AnsweredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  //Question currently displayed
  const [question, setQuestion] = useState(firstQuestion);

  //Function ejectued when player selects an answer
  const changeQuestion = async (
    index: number,
    correct: boolean,
    nextQuesiton: QuestionWithAnswers
  ) => {
    //Add Answer to the Answer Array
    if (correct) {
      setPlayerPoints((playerPoints) => playerPoints + 1);
    }
    //Adding Question to Answered Questions.
    const newAnsweredQuestion = [...AnsweredQuestions];
    newAnsweredQuestion.push(question.id);
    setAnsweredQuestions(newAnsweredQuestion);

    if (AnsweredQuestions.length == 9) {
      //NO more questions? -> Finish game
      setFinished(true);
      gameOver();
    } else {
      // Go to the next Question
      setQuestion(nextQuesiton);
    }
  };
  const gameOver = () => {
    setFinished(true);
    setTimeout(() => updateGame(game, playerPoints), 100);
  };

  return (
    <>
      {!finished ? (
        <div className="flex min-h-screen flex-col  w-full md:w-4/12    bg-customBlue px-10">
          <div className="mb-5 flex h-1/4 w-full justify-center items-center mt-5 relative">
            <div className="absolute top-0 left-0 w-full h-full z-0">
              <Image
                src="/images/Tempo.png"
                alt="Imagen"
                width={750}
                height={231}
              />
            </div>
            <div className="h-auto w-full border-lime-100 flex flex-col justify-center items-center text-6xl text-black font-bold mt-6 px-5 relative z-10">
              <Timer gameOver={gameOver} time={30} />
            </div>
          </div>

          <div className="w-full h-auto flex-col justify-center items-center mt-8 relative">
            <Image
              src="/images/GameCard.png"
              alt="Imagen de fondo"
              width={750}
              height={1000}
            />
            <div className="absolute top-4 left-0 w-full h-full flex-col justify-center items-center">
              <QuestionAndAnswers
                question={question.question}
                answers={question.answers}
                onAnswer={changeQuestion}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen w-full md:w-4/12 bg-white px-10 justify-center items-center relative">
          <div className="inset-0 relative">
            <Image
              src="/images/FinalRes.png"
              alt="Fondo del div"
              width={900}
              height={600}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <h1 className="text-6x1 text-white mx-4">
                Respondiste {playerPoints} preguntas correctamente
              </h1>
              <Link href={"/"} className="mt-10 w-40 bg-red-600 text-center">
                Continuar
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default GameCard;
