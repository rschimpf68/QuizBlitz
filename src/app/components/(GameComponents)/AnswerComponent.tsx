"use client";
import {
  use,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  QuestionWithAnswers,
  checkAnswerGetNextQuestion,
} from "../../game/[id]/action";
import { Game, Round } from "@prisma/client";
import { motion } from "framer-motion";

import { Howl, Howler } from "howler";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../../../public/fonts/font.ttf" });

interface Props {
  index: number;
  idAnswer: string;
  text: string;
  idAnsweredQuestions: string[];
  game: Game & {
    Rounds: Round[];
  };
  answerSelected: boolean;
  setAnswerSelected: Dispatch<SetStateAction<boolean>>;
  onAnswered: (arg1: number, arg2: boolean, arg3: QuestionWithAnswers) => void;
}
const AnswerComponent: React.FC<Props> = ({
  index,
  idAnswer,
  text,
  onAnswered,
  idAnsweredQuestions,
  game,
  setAnswerSelected,
  answerSelected,
}) => {
  const [firstTime, setFirstTime] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [displayAnimation, setDisplayAnimation] = useState(false);
  const [correct, setCorrect] = useState(false);

  var incorrectSound = new Howl({
    src: ["/sounds/WrongAnswer.wav"],
    volume: 0.4,
  });
  var correctSound = new Howl({
    src: ["/sounds/CorrectAnswer.wav"],
    volume: 0.4,
  });

  useEffect(() => {
    if (firstTime) {
      if (correct && answered) {
        correctSound.play();
      } else if (!correct && !answered) {
        incorrectSound.play();
      }
    }
    setFirstTime(true);
  }, [answered]);

  const handleSubmit = async () => {
    //Check if Answer is the correct one
    setAnswerSelected(true);
    setDisplayAnimation(true);
    const [isCorrect, nextQuestion] = await checkAnswerGetNextQuestion(
      idAnswer,
      idAnsweredQuestions,
      game
    );

    setDisplayAnimation(false);

    setCorrect(isCorrect);
    setAnswered(true);
    setTimeout(() => {
      setAnswered(false);
      setAnswerSelected(false);
      onAnswered(index, isCorrect, nextQuestion);
    }, 200);
  };

  return (
    <motion.div
      animate={{ rotate: displayAnimation ? [0, 1, 0, -1, 0] : 0 }}
      transition={{ duration: 0.2, repeat: displayAnimation ? 10 : 0 }}
    >
      <button
        onClick={handleSubmit}
        disabled={answerSelected}
        className={`${
          myFont.className
        } my-5 flex  w-full items-center justify-center rounded-md border-2 py-4 text-lg  text-black outline-none transition-all duration-200 hover:scale-105 disabled:pointer-events-none  ${
          answered
            ? correct
              ? "bg-green-200 border-green-300"
              : "bg-red-200 border-red-300"
            : "bg-white"
        }`}
      >
        {text}
      </button>
    </motion.div>
  );
};
export default AnswerComponent;
