"use client";
import { FunctionComponent, useEffect, useState } from "react";

type Props = {
  gameOver: () => void;
};
const Timer: FunctionComponent<Props> = ({ gameOver }) => {
  const [count, setCount] = useState(15);
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
