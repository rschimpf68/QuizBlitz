"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Howl } from "howler";

interface PlayButtonProps {
  unpressedImageUrl: string;
  pressedImageUrl: string;
  href: string;
  onClick?: () => void;
  useLink?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  unpressedImageUrl,
  pressedImageUrl,
  href,
  onClick,
  useLink = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // var sound = new Howl({
  //   src: ['/sounds/Click.wav']
  // });
  // useEffect(() => {
  //   if (isPressed == true) {
  //     sound.play();
  //   }
  // }, [isPressed])
  const body = () => {
    return (
      <div className="w-16 h-16 flex items-center">
        <Image
          src={isPressed ? pressedImageUrl : unpressedImageUrl}
          alt={isPressed ? "Pressed Button" : "Unpressed Button"}
          width={140}
          height={110}
          className="mt-22"
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
      {useLink ? (
        <Link
          href={href}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          onDragStart={handleDragStart}
          onMouseLeave={handleMouseLeave}
          draggable="false"
          prefetch={true}
          className="relative bg-transparent block text-center outline-none border-none cursor-pointer"
        >
          {body()}
        </Link>
      ) : (
        <a
          href={href}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          onDragStart={handleDragStart}
          onMouseLeave={handleMouseLeave}
          draggable="false"
          className="relative bg-transparent block text-center outline-none border-none cursor-pointer"
        >
          {body()}
        </a>
      )}
    </>
  );
};

export default PlayButton;
