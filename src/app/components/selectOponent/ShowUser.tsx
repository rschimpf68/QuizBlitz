"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { findUser } from "../../selectOpponent/action";
import { User } from "@prisma/client";
import Image from "next/image";
interface Props {
  user?: User;
  index: number;
  setUsuario: Dispatch<SetStateAction<User | undefined>>;
  userSelected: User | undefined;
}
const ShowUser: React.FC<Props> = ({
  user,
  index,
  setUsuario,
  userSelected,
}) => {
  const isClicked = userSelected
    ? userSelected.id == user?.id
    : user
    ? false
    : true;
  const src = user ? user.image : "/images/Random.png";
  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center hover:scale-105 "
      onClick={() => setUsuario(user)}
    >
      <label
        htmlFor={user?.id}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <img
          src={src as string}
          alt="Opponent"
          width={80}
          height={80}
          className={`${
            isClicked ? "border-8 border-green-200" : ""
          } rounded-full `}
        />

        <h1 className="text-base text-center truncate max-w-full">
          {user ? user?.name : "Random"}
        </h1>
      </label>
    </div>
  );
};

export default ShowUser;
