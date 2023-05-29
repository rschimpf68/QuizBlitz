"use client";
import { useCallback, useState } from "react";

interface AnswerProps {
  text: string;
  correct: boolean;
  onAnswered: (arg0: boolean) => void;
}
const Pregunta: React.FC<AnswerProps> = ({ text, correct, onAnswered }) => {
  const [answered, setAnswered] = useState(false);
  const handleSubmit = useCallback(() => {
    setAnswered(true);
    setTimeout(() => {
      setAnswered(false);
    }, 300);
    setTimeout(() => {
      onAnswered(correct);
    }, 500);
  }, [correct, answered, onAnswered]);

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
export default Pregunta;
