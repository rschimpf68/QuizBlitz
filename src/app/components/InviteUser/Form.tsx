"use client";
import { newGame } from "../../inviteUser/action";

const Form = () => {
  return (
    <form action={newGame}>
      <div className="overflow-auto h-96 ">
        <div className="grid grid-cols-3 grid-flow-row w-full justify-center items-center gap-4 my-2 ">
          {users.length > 0 &&
            users.map((user, index) => {
              return <ShowUser key={index} user={user} />;
            })}
        </div>
      </div>
      <button
        type="submit"
        className=" border-4 border-gray-200 flex justify-center items-center bg-orange-500 w-full h-10 rounded-xl text-2xl text-white font-bold hover:bg-orange-400"
      >
        Jugar
      </button>
    </form>
  );
};
