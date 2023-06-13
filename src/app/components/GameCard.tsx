"use client";
import { useCallback, useState } from "react";

import AnswerComponent from "./AnswerComponent";
import Timer from "./Timer";
import QuestionAndAnswers from "./QuestionAndAnswers";
import Link from "next/link";
import { Answer, Game, Question, Round } from "@prisma/client";
import { updateGame } from "../game/[id]/action";

interface Props {
  questions: {
    question: string;
    answers: {
      answer: string;
      id: string;
    }[];
    id: string;
  }[];

  game: Game & { Rounds: Round[] };
}
interface AnsweredQuestion {
  question: string;
  selectedAnswer: string;
  correct: boolean;
}

const GameCard: React.FC<Props> = ({
  questions,

  game,
}) => {
  //React States
  //Current question
  const [questionCounter, setQuestionCounter] = useState(0);
  //GameOver
  const [finished, setFinished] = useState(false);
  //Array of Answered questions by player
  const [playerPoints, setPlayerPoints] = useState(0);
  const [AnsweredQuestions, setAnsweredQuestions] = useState(
    Array(questions.length).fill(null)
  );
  //Question currently displayed
  const question = questions[questionCounter];

  //Function ejectued when player selects an answer
  const changeQuestion = async (index: number, correct: boolean) => {
    //Add Answer to the Answer Array
    if (correct) {
      setPlayerPoints((playerPoints) => playerPoints + 1);
    }
    const answeredQuestion: AnsweredQuestion = {
      question: question.question,
      selectedAnswer: question.answers[index].answer,
      correct: correct,
    };
    //Copy of the original Array.
    const newAnsweredQuestion = [...AnsweredQuestions];
    newAnsweredQuestion[questionCounter] = answeredQuestion;
    setAnsweredQuestions(newAnsweredQuestion);

    if (questionCounter == questions.length - 1) {
      //NO more questions? -> Finish game
      setFinished(true);
      gameOver();
    } else {
      // Go to the next Question
      setQuestionCounter((questionCounter) => questionCounter + 1);
    }
  };
  const gameOver = () => {
    setFinished(true);
    setTimeout(() => updateGame(game, playerPoints), 100);
  };

  return (
    <>
      {!finished ? (
        <div className="flex min-h-screen w-4/12 flex-col  bg-white px-10">
          <div className="mb-5 flex h-1/4 w-full justify-center items-center mt-5 ">
            <div className="h-auto w-full border-lime-100 flex flex-col justify-center items-center  text-6xl text-black font-bold px-5">
              <Timer gameOver={gameOver} time={30} />
              <h1 className=" mt-5 text-lg ">{playerPoints}</h1>
            </div>
          </div>
          <div className="w-full h-auto flex-col justify-center items-center mt-20 ">
            <QuestionAndAnswers
              question={question.question}
              answers={question.answers}
              onAnswer={changeQuestion}
            />
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen w-4/12 flex-col  bg-white px-10 justify-center items-center">
          <h1 className="text-lg ">
            Respondiste {playerPoints} preguntas correctamente
          </h1>
          <Link href={"/"} className="mt-10 w-40 bg-red-600 text-center">
            Continuar
          </Link>
        </div>
      )}
    </>
  );
};
export default GameCard;
