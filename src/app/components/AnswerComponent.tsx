"use client";
import { useCallback, useState } from "react";

interface Props {
  index: number;
  idAnswer: string;
  text: string;
  correct: boolean;
  onAnswered: (arg1: number, arg2: boolean) => void;
}
const AnswerComponent: React.FC<Props> = ({
  index,
  idAnswer,
  text,
  correct,
  onAnswered,
}) => {
  const [answered, setAnswered] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(`/api/checkAnswer?id=${idAnswer}`);
    const correct = await response.json;
    console.log(correct);
    setAnswered(true);
    setTimeout(() => {
      setAnswered(false);
      onAnswered(index, true);
    }, 200);
  };

  return (
    <div className="bg-white">
      <button
        onClick={handleSubmit}
        className={` my-5 flex  w-full items-center justify-center rounded-md border-2 py-4 text-lg  text-black outline-none transition-all duration-200 hover:scale-105 disabled:pointer-events-none  ${
          answered ? (correct ? "bg-green-100" : "bg-red-100") : "bg-white"
        }`}
      >
        {text}
      </button>
    </div>
  );
};
export default AnswerComponent;
