"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Howl } from "howler";
interface PlayButtonProps {
  unpressedImageUrl: string;
  pressedImageUrl: string;

  onClick?: () => void;
}

const StartButton: React.FC<PlayButtonProps> = ({
  unpressedImageUrl,
  pressedImageUrl,
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  var sound = new Howl({
    src: ['/sounds/Click.wav']
  });
  useEffect(() => {
    if (isPressed == true) {
      sound.play();
    }
  }, [isPressed])
  const body = () => {
    return (
      <div className="w-full h-full flex items-center">
        <Image
          src={isPressed ? pressedImageUrl : unpressedImageUrl}
          alt={isPressed ? "Pressed Button" : "Unpressed Button"}
          width={144}
          height={75}
          className="mt-22"
          draggable="false"
        />
      </div>
    );
  };
  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleDragStart = (event: React.DragEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        draggable="false"
        className="relative bg-transparent block text-center outline-none border-none cursor-pointer"
      >
        {body()}
      </div>
    </>
  );
};

export default StartButton;
