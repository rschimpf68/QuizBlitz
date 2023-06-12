"use client";
import React, { useState, useEffect } from "react";

interface DropdownMenuProps {
  collapsedImageUrl: string;
  expandedImageUrl: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  collapsedImageUrl,
  expandedImageUrl
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        className="bg-transparent border-none outline-none cursor-pointer"
        onClick={toggleMenu}
      >
        <img
          src={isOpen ? expandedImageUrl : collapsedImageUrl}
          alt="Dropdown Menu"
          className="w-20 h-10"
        />
      </button>

      {clientSide && isOpen && (
        <div className=" z-10 left-0  bg-indigo-900 rounded shadow-lg">
          <button className="block w-full py-2 px-4 text-left text-white hover:bg-indigo-800 transition-colors duration-300">
            Botón 1
          </button>
          <div className="border-t border-gray-400"></div>
          <button className="block w-full py-2 px-4 text-left text-white hover:bg-indigo-800 transition-colors duration-300">
            Botón 2
          </button>
          <div className="border-t border-gray-400"></div>
          <button className="block w-full py-2 px-4 text-left text-white hover:bg-indigo-800 transition-colors duration-300">
            Botón 3
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
