"use client";
import { useCallback, useState } from "react";
import { checkAnswer } from "../game/[id]/action";

interface Props {
  index: number;
  idAnswer: string;
  text: string;

  onAnswered: (arg1: number, arg2: boolean) => void;
}
const AnswerComponent: React.FC<Props> = ({
  index,
  idAnswer,
  text,
  onAnswered,
}) => {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleSubmit = async () => {
    //Check if Answer is the correct one

    const isCorrect: boolean = await checkAnswer(idAnswer);

    setCorrect(isCorrect);
    setAnswered(true);
    setTimeout(() => {
      setAnswered(false);
      onAnswered(index, isCorrect);
    }, 200);
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className={` my-5 flex  w-full items-center justify-center rounded-md border-2 py-4 text-lg  text-black outline-none transition-all duration-200 hover:scale-105 disabled:pointer-events-none  ${
          answered ? (correct ? "bg-green-200" : "bg-red-200") : "bg-white"
        }`}
      >
        {text}
      </button>
    </div>
  );
};
export default AnswerComponent;
