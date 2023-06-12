"use client";
import { FunctionComponent, useEffect, useState } from "react";

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
      //setCount((count) => count - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div> {count}</div>;
};
export default Timer;
