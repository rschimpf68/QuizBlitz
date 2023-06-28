"use client";
import { motion } from "framer-motion";
import { FunctionComponent, useEffect, useState } from "react";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../../../public/fonts/font.ttf" });

type Props = {
  gameOver: () => void;
  time: number;
};
const Timer: FunctionComponent<Props> = ({ gameOver, time }) => {
  const [count, setCount] = useState(time);
  if (count == 0) {
    gameOver();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <motion.div
        animate={{ scale: count < 10 ? [1, 1.1, 1] : [1, 1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className={`${count < 10 ? " text-red-600" : "text-white"}`}
      >
        <div className={`${myFont.className}`}>{count}</div>
      </motion.div>
    </div>
  );
};
export default Timer;
