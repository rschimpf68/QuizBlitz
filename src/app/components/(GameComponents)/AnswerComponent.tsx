"use client";
import { use, useCallback, useEffect, useState } from "react";
import {
  QuestionWithAnswers,
  checkAnswerGetNextQuestion,
} from "../../game/[id]/action";
import { Game, Round } from "@prisma/client";
import { motion } from "framer-motion";
import Sound from "../Sound";
import {Howl, Howler} from 'howler'

interface Props {
  index: number;
  idAnswer: string;
  text: string;
  idAnsweredQuestions: string[];
  game: Game & {
    Rounds: Round[];
  };

  onAnswered: (arg1: number, arg2: boolean, arg3: QuestionWithAnswers) => void;
}
const AnswerComponent: React.FC<Props> = ({
  index,
  idAnswer,
  text,
  onAnswered,
  idAnsweredQuestions,
  game,
}) => {
  const [firstTime, setFirstTime] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [displayAnimation, setDisplayAnimation] = useState(false);
  const [correct, setCorrect] = useState(false);

  var incorrectSound = new Howl({
    src: ['/sounds/WrongAnswer.wav'],
    volume: 0.4
  });
  var correctSound = new Howl({
    src: ['/sounds/CorrectAnswer.wav'],
    volume: 0.4
  });

  useEffect(() => {
    if (firstTime) {
      if (correct && answered) {
        correctSound.play()
      } 
      else if (!correct && !answered) {
        incorrectSound.play()
      }
    }
    setFirstTime(true)
  }, [answered])

  const handleSubmit = async () => {
    //Check if Answer is the correct one

    const [returns, a] = await Promise.all([
      checkAnswerGetNextQuestion(idAnswer, idAnsweredQuestions, game),
      trigerAnimation(),
    ]);
    const isCorrect = returns[0];
    const nextQuestion = returns[1];
    setCorrect(isCorrect);
    setAnswered(true);
    setTimeout(() => {
      setAnswered(false);
      onAnswered(index, isCorrect, nextQuestion);
    }, 200);
  };
  const trigerAnimation = async () => {
    setDisplayAnimation(true);
    setTimeout(() => {
      setDisplayAnimation(false);
    }, 1000);
    return "a";
  };

  return (
    <motion.div
      animate={{ rotate: displayAnimation ? [2, 0, -2] : 0 }}
      transition={{ duration: 0.2, times: [0.5, 1, 1.5] }}
    >
      <button
        onClick={handleSubmit}
        className={` my-5 flex  w-full items-center justify-center rounded-md border-2 py-4 text-lg  text-black outline-none transition-all duration-200 hover:scale-105 disabled:pointer-events-none  ${
          answered ? (correct ? "bg-green-200" : "bg-red-200") : "bg-white"
        }`}
      >
        {text}
      </button>
    </motion.div>
  );
};
export default AnswerComponent;
