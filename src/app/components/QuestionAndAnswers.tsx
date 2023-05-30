"use client";
import { useCallback, useState } from "react";

import { questionInterface } from "../game/page";
import AnswerComponent from "./Answer";
interface QNA {
  questions: questionInterface[][];
}
const QuestionAndAnswers: React.FC<QNA> = ({ questions }) => {
  const [roundCounter, setRoundCounter] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [finished, setFinished] = useState(false);
  const [CorrectQuestions, setCorrectQuestions] = useState(0);
  let question = questions[roundCounter][questionCounter];

  const changeQuestion = useCallback(
    (answer: boolean) => {
      answer && setCorrectQuestions((CorrectQuestions) => CorrectQuestions + 1);

      if (questionCounter < questions[roundCounter].length - 1) {
        setQuestionCounter((counter) => counter + 1);
      } else if (roundCounter < questions.length - 1) {
        setQuestionCounter(0);
        setRoundCounter((roundCounter) => roundCounter + 1);
      } else {
        setFinished(true);
      }
    },
    [
      questionCounter,
      setQuestionCounter,
      questions,
      setRoundCounter,
      roundCounter,
      setFinished,
      CorrectQuestions,
      setCorrectQuestions,
    ]
  );

  return (
    <>
      {!finished ? (
        <div className="flex min-h-screen w-4/12 flex-col  bg-white px-10">
          <div className="mb-5 flex h-1/4 w-full justify-center items-center mt-5">
            <div className="h-auto w-full border-lime-100 bg-red-200 flex justify-center text-6xl text-white">
              {question.category.name}
            </div>
          </div>
          <div className="w-full h-auto flex-col justify-center items-center mt-20 ">
            <div className="mb-5 flex h-auto w-full justify-center text-center text-3xl font-bold">
              {question.question}
            </div>
            <div className="w-full">
              {question.answers.map((answer) => {
                return (
                  <AnswerComponent
                    text={answer.answer}
                    correct={answer.correct}
                    onAnswered={changeQuestion}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <h1>Contestate {CorrectQuestions} preguntas correctamente</h1>
      )}
    </>
  );
};
export default QuestionAndAnswers;
