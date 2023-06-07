"use client";
import { useCallback, useState } from "react";

import { questionInterface } from "../game/page";
import AnswerComponent from "./Answer";
import Timer from "./Timer";
import QuestionAndAnswers from "./QuestionAndAnswers";

interface QNA {
  questions: questionInterface[];
}

const GameCard: React.FC<QNA> = ({ questions }) => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [finished, setFinished] = useState(false);
  const [CorrectQuestions, setCorrectQuestions] = useState(0);
  let question = questions[questionCounter];

  const changeQuestion = useCallback(
    (answer: boolean, index: number) => {
      answer && setCorrectQuestions((CorrectQuestions) => CorrectQuestions + 1);
      if (questionCounter == questions.length - 1) {
        setFinished(true);
      } else {
        setQuestionCounter((questionCounter) => questionCounter + 1);
      }
    },
    [
      questionCounter,
      setQuestionCounter,
      setFinished,
      CorrectQuestions,
      setCorrectQuestions,
      questions,
    ]
  );
  const gameOver = () => {
    setFinished(true);
  };

  return (
    <>
      {!finished ? (
        <div className="flex min-h-screen w-4/12 flex-col  bg-white px-10">
          <div className="mb-5 flex h-1/4 w-full justify-center items-center mt-5">
            <div className="h-auto w-full border-lime-100 bg-red-200 flex justify-center text-6xl text-white">
              <Timer gameOver={gameOver} />
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
        <h1>Contestate {CorrectQuestions} preguntas correctamente</h1>
      )}
    </>
  );
};
export default GameCard;
