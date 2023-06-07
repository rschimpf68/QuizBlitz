"use client";
import { useCallback, useState } from "react";

import { questionInterface } from "../game/page";
import AnswerComponent from "./Answer";
import Timer from "./Timer";
import { Answer } from "@prisma/client";
interface Props {
  question: string;
  answers: Answer[];
  onAnswer: (arg0: boolean, arg1: number) => void;
}
const QuestionAndAnswers: React.FC<Props> = ({
  question,
  answers,
  onAnswer,
}) => {
  return (
    <main>
      <div className="mb-10 flex h-auto w-full justify-center text-center text-3xl font-bold">
        {question}
      </div>
      <div className="w-full">
        {answers.map((answer, index) => {
          return (
            <AnswerComponent
              key={index}
              text={answer.answer}
              correct={answer.correct}
              onAnswered={onAnswer}
            />
          );
        })}
      </div>
    </main>
  );
};
export default QuestionAndAnswers;
