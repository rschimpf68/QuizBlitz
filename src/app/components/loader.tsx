"use client";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-auto w-auto flex flex-col justify-center items-center ">
      <ClipLoader size={50} color="red" />
    </div>
  );
};

export default Loader;
