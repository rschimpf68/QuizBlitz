"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sound from "../Sound";

interface SoundButtonProps {
  initialImageUrl: string;
  transitionImageUrl: string;
  finalImageUrl: string;
}

const SoundButton: React.FC<SoundButtonProps> = ({
  initialImageUrl,
  transitionImageUrl,
  finalImageUrl,
}) => {
  const [isMuted, setIsMuted] = useState(true);
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
      }, 50); // Cambiar la imagen a finalImageUrl después de 500 milisegundos (0.5 segundos)

      return () => clearTimeout(timeout); // Limpiar el timeout cuando el componente se desmonte o se actualice
    } else {
      if (currentImageUrl === finalImageUrl) {
        setIsTransitioning(true);
        setCurrentImageUrl(transitionImageUrl);

        const timeout = setTimeout(() => {
          setIsTransitioning(false);
          setCurrentImageUrl(initialImageUrl);
        }, 50); // Cambiar la imagen a initialImageUrl después de 500 milisegundos (0.5 segundos)

        return () => clearTimeout(timeout); // Limpiar el timeout cuando el componente se desmonte o se actualice
      }
    }
  }, [isMuted]);

  return (
    <section>
      <button
        className="bg-transparent border-none outline-none cursor-pointer relative"
        onClick={handleClick}
      >
        <Image
          src={transitionImageUrl}
          alt="Sound On"
          width={64}
          height={32}
          className={`absolute transition-opacity duration-500 ${
            isTransitioning ? "opacity-100" : "opacity-0"
          }`}
          draggable="false"
        />
        <Sound
          playing={!isMuted}
          loop={false}
          src="/sounds/GoldenWind.mp3"
          volume={0.4}
        />
        <Image src={currentImageUrl} alt="Sound Mute" width={64} height={32} />
      </button>
    </section>
  );
};

export default SoundButton;
