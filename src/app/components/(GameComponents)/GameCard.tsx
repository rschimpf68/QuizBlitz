"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import AnswerComponent from "./AnswerComponent";
import Timer from "./Timer";
import QuestionAndAnswers from "./QuestionAndAnswers";
import Link from "next/link";
import { Answer, Game, Question, Round } from "@prisma/client";
import { QuestionWithAnswers, updateGame } from "../../game/[id]/action";
import Image from "next/image";
interface Props {
  firstQuestion: QuestionWithAnswers;
  setGameState: Dispatch<SetStateAction<number>>;
  game: Game & { Rounds: Round[] };
  QuestionsPerGame: Number;
  setPlayerPoints: Dispatch<SetStateAction<number>>;
  playerPoints: number;
}

const GameCard: React.FC<Props> = ({
  firstQuestion,
  QuestionsPerGame,
  game,
  setGameState,
  setPlayerPoints,
  playerPoints,
}) => {
  //React States

  //GameOver
  const [finished, setFinished] = useState(false);
  //Questions Answered correctly by player

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

    if (AnsweredQuestions.length == QuestionsPerGame) {
      //NO more questions? -> Finish game
      setFinished(true);
      gameOver();
    } else {
      // Go to the next Question
      setQuestion(nextQuesiton);
    }
  };
  const gameOver = () => {
    updateGame(game, playerPoints);
    setGameState(2);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col  w-full md:w-4/12   bg-customBlue px-10">
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

        <div className="flex bg-[#D3AB6E] border-8  border-[#97605E] w-full h-full flex-col justify-center items-center mt-10 rounded-lg">
          <QuestionAndAnswers
            question={question.question}
            answers={question.answers}
            onAnswer={changeQuestion}
            idAnsweredQuestions={AnsweredQuestions}
            game={game}
          />
        </div>
      </div>
    </>
  );
};
export default GameCard;
