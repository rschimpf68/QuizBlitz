"use client";
import { useCallback, useEffect, useState } from "react";

import AnswerComponent from "./AnswerComponent";
import Timer from "./Timer";
import { Answer, Game, Round } from "@prisma/client";
import { QuestionWithAnswers } from "@/app/game/[id]/action";
interface Props {
  idAnsweredQuestions: string[];
  question: string;
  answers: {
    answer: string;
    id: string;
  }[];
  onAnswer: (arg1: number, arg2: boolean, arg3: QuestionWithAnswers) => void;
  game: Game & {
    Rounds: Round[];
  };
}
const QuestionAndAnswers: React.FC<Props> = ({
  question,
  answers,
  onAnswer,
  idAnsweredQuestions,
  game,
}) => {
  const [AnswerSelected, setAnswerSelected] = useState(false);
  return (
    <main>
      <div className="mb-8 mt-4 flex h-auto w-4/5 mx-auto justify-center text-center text-2xl font-bold">
        {question}
      </div>
      <div className="w-4/5 justify-center mx-auto">
        {answers.map((answer, index) => {
          return (
            <AnswerComponent
              key={index}
              index={index}
              idAnswer={answer.id}
              text={answer.answer}
              idAnsweredQuestions={idAnsweredQuestions}
              onAnswered={onAnswer}
              game={game}
              answerSelected={AnswerSelected}
              setAnswerSelected={setAnswerSelected}
            />
          );
        })}
      </div>
    </main>
  );
};
export default QuestionAndAnswers;
