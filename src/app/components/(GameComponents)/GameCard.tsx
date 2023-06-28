"use client";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import AnswerComponent from "./AnswerComponent";
import Timer from "./Timer";
import QuestionAndAnswers from "./QuestionAndAnswers";
import Link from "next/link";
import { Answer, Game, Question, Round } from "@prisma/client";
import { QuestionWithAnswers, updateGame } from "../../game/[id]/action";
import Image from "next/image";
import SoundButton from "../buttons/B-Mute";
interface Props {
  firstQuestion: QuestionWithAnswers;
  setGameState: Dispatch<SetStateAction<number>>;
  game: Game & { Rounds: Round[] };
  QuestionsPerGame: number;
  setPlayerPoints: Dispatch<SetStateAction<number>>;
  playerPoints: number;
  setMessageEndGame: Dispatch<SetStateAction<string>>;
  setAnsweredQuestions: Dispatch<SetStateAction<string[]>>;
  AnsweredQuestions: string[];
  answer: boolean[];
  setAnswer: Dispatch<SetStateAction<boolean[]>>;
}

const GameCard: React.FC<Props> = ({
  firstQuestion,
  QuestionsPerGame,
  game,
  setGameState,
  setPlayerPoints,
  playerPoints,
  AnsweredQuestions,
  setAnsweredQuestions,
  setMessageEndGame,
}) => {
  //React States

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

    if (AnsweredQuestions.length + 1 >= QuestionsPerGame) {
      //NO more questions? -> Finish game
      gameOver(true);
    } else {
      // Go to the next Question
      setQuestion(nextQuesiton);
    }
  };

  //If Time Is Over or User Answered All Questions
  const gameOver = async (allAnswered = false) => {
    const message = allAnswered
      ? "Contestaste todas las preguntas"
      : "Se te acabó el tiempo";
    setMessageEndGame(message);
    await updateGame(game, playerPoints);
    setGameState(2);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col  w-full md:w-4/12   bg-customBlue px-10">
        <div className="mb-5 flex h-1/4 w-full flex-col justify-center items-center relative">
          <div className="flex justify-end w-full  mt-2">
            <SoundButton
              initialImageUrl="/images/MusicOn.png"
              transitionImageUrl="/images/MusicTransition2.png"
              finalImageUrl="/images/MusicOff.png"
            />
                    
          </div>

          <div className="h-24 w-24 bg-yellow-500  border-8 py-2  border-yellow-600 flex flex-col justify-center items-center text-6xl text-black mt-2 px-5 rounded-lg ">
            <Timer gameOver={gameOver} time={60} />
          </div>
        </div>

        <div className="flex bg-[#D3AB6E] border-8  border-[#97605E] w-full h-full flex-col justify-center items-center  rounded-lg">
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
