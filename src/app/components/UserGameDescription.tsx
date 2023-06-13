import { FunctionComponent } from "react";
import Image from "next/image";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../../public/fonts/upheavtt.ttf" });

type Props = {
  username?: string | null;
  image?: string;
};

const UserGameDescription: FunctionComponent<Props> = ({
  username,
  image = "/images/Banner.png",
}) => {
  return (
    <div className="flex w-auto h-20 items-center justify-center">
      <div className="relative">
        <Image src={image} width={500} height={500} alt="" />
        <h1
          className={`${myFont.className} text-2xl absolute inset-0 flex items-center justify-center text-white top-[-25%]`}
        >
          {username ? username : "Random Opponent"}
        </h1>
      </div>
    </div>
  );
};

export default UserGameDescription;
