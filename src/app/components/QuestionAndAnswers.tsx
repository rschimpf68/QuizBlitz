"use client";
import { useCallback, useEffect, useState } from "react";

import AnswerComponent from "./Answer";
import Timer from "./Timer";
import { Answer } from "@prisma/client";
interface Props {
  question: string;
  answers: Answer[];
  onAnswer: (arg1: number) => void;
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
              index={index}
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
