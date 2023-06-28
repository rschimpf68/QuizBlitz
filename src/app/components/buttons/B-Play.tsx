"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Sound from "../Sound";
import { Howl, Howler } from "howler";

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
  var sound = new Howl({
    src: ["/sounds/Click.wav"],
  });

  useEffect(() => {
    if (isPressed == true) {
      sound.play();
    }
  }, [isPressed]);

  const body = () => {
    return (
      <div className="w-full h-full flex items-center focus:outline-none select-none">
        <Image
          src={isPressed ? pressedImageUrl : unpressedImageUrl}
          alt={isPressed ? "Pressed Button" : "Unpressed Button"}
          width={144}
          height={75}
          draggable={false}
          className="mt-22 focus:outline-none"
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
