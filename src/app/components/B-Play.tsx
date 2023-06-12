"use client";
import React, { useState } from "react";

interface PlayButtonProps {
  unpressedImageUrl: string;
  pressedImageUrl: string;
  href: string;
  onClick?: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  unpressedImageUrl,
  pressedImageUrl,
  href,
  onClick
}) => {
  const [isPressed, setIsPressed] = useState(false);

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
    <div className="w-full h-5/6 flex items-center">
      <img
        src={isPressed ? pressedImageUrl : unpressedImageUrl}
        alt={isPressed ? "Pressed Button" : "Unpressed Button"}
        className="w-36 h-22 mt-22"
        draggable="false"
      />
    </div>
    </a>
  );
};

export default PlayButton;
