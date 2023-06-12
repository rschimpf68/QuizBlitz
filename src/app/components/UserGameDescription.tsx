import { FunctionComponent } from "react";
import Image from "next/image";

type Props = {
  username?: string | null;
  image?: string;
};
const Timer: FunctionComponent<Props> = ({
  username,
  image = "https://avatars.githubusercontent.com/u/127883061?v=4",
}) => {
  return (
    <div className="flex w-auto h-20  items-center justify-center">
      {
        //<Image src={image} width={500} height={500} alt={""} />
      }
      <h1 className=" text-2xl">{username ? username : "Random Oponent"}</h1>
    </div>
  );
};
export default Timer;
