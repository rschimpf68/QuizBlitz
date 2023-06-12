"use client";
import React, { useState, useEffect } from "react";

interface SoundButtonProps {
  initialImageUrl: string;
  transitionImageUrl: string;
  finalImageUrl: string;
}

const SoundButton: React.FC<SoundButtonProps> = ({
  initialImageUrl,
  transitionImageUrl,
  finalImageUrl
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(initialImageUrl);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (isMuted) {
      setIsTransitioning(true);
      setCurrentImageUrl(transitionImageUrl);

      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImageUrl(finalImageUrl);
      }, 70); // Cambiar la imagen a finalImageUrl después de 500 milisegundos (0.5 segundos)

      return () => clearTimeout(timeout); // Limpiar el timeout cuando el componente se desmonte o se actualice
    } else {
      if (currentImageUrl === finalImageUrl) {
        setIsTransitioning(true);
        setCurrentImageUrl(transitionImageUrl);

        const timeout = setTimeout(() => {
          setIsTransitioning(false);
          setCurrentImageUrl(initialImageUrl);
        }, 70); // Cambiar la imagen a initialImageUrl después de 500 milisegundos (0.5 segundos)

        return () => clearTimeout(timeout); // Limpiar el timeout cuando el componente se desmonte o se actualice
      }
    }
  }, [isMuted]);

  return (
    <button
      className="bg-transparent border-none outline-none cursor-pointer relative"
      onClick={handleClick}
    >
      <img
        src={transitionImageUrl}
        alt="Transition Image"
        className={`w-16 h-8 absolute transition-opacity duration-500 ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={currentImageUrl}
        alt="Sound Button"
        className="w-16 h-8"
      />
    </button>
  );
};

export default SoundButton;
