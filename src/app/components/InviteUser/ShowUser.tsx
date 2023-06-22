"use client";
import { ChangeEvent, Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import { findUser } from "../../inviteUser/action";
import { User } from "@prisma/client";
interface Props {
  user: User;
  index: number;
  setUsuario: Dispatch<SetStateAction<User | undefined>>
  userSelected: User| undefined; 
}
const ShowUser: React.FC<Props> = ({ user, index, setUsuario, userSelected }) => {
  const isClicked = userSelected? userSelected.id == user.id : false;
  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center" onClick={()=>setUsuario(user)}>
      <input
        key={index}
        type="hidden"
        name={user.id}
        hidden
      />
      <label htmlFor={user.id} className="w-full h-full flex flex-col justify-center items-center" >
        <div className={`${isClicked? "bg-green-200 hover:green-100" : "bg-black hover:bg-gray-900" } rounded-full w-20 h-20 `}>         

        </div>
        <h1 className="text-lg">{user.name}</h1>
      </label>
    </div>
  );
};

export default ShowUser;
