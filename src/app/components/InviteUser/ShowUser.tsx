"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from "react";
import { findUser } from "../../inviteUser/action";
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

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      onClick={() => setUsuario(user)}
    >
      <label
        htmlFor={user?.id}
        className="w-full h-full flex flex-col justify-center items-center"
      >
        {user ? (
          <img
            src={user.image as string}
            alt={user.name as string}
            width={80}
            height={80}
            className={`${
              isClicked
                ? "bg-green-200 hover:green-100"
                : "bg-black hover:bg-purple-900"
            } rounded-full `}
          />
        ) : (
          <img
            src="/images/Random.png"
            alt="Random"
            width={80}
            height={80}
            className={`${
              isClicked
                ? "bg-green-200 hover:green-100"
                : "bg-black hover:bg-purple-900"
            } rounded-full `}
          />
        )}

        <h1 className="text-base text-center truncate max-w-full">
          {user ? user?.name : "Random"}
        </h1>
      </label>
    </div>
  );
};

export default ShowUser;
