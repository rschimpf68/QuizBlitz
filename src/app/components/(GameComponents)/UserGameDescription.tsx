import { FunctionComponent } from "react";
import Image from "next/image";
import { NextFont } from "@next/font";

type Props = {
  username?: string | null;
  image?: string;
  font: NextFont;
};

const UserGameDescription: FunctionComponent<Props> = ({
  username,
  image = "/images/Banner.png",
  font,
}) => {
  return (
    <div className="flex w-auto h-20 items-center justify-center">
      <div className="relative">
        <Image
          src={image}
          width={500}
          height={100}
          alt=""
          quality={1}
          sizes="100vh"
        />
        <h1
          className={`${font.className} text-2xl absolute inset-0 flex items-center justify-center text-white top-[-25%]`}
        >
          {username ? username : "Oponente Aleatorio"}
        </h1>
      </div>
    </div>
  );
};

export default UserGameDescription;
