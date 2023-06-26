import { FunctionComponent } from "react";
import Image from "next/image";
import { NextFont } from "@next/font";

type Props = {
  username?: string | null;
  image?: string;
  font: NextFont;
  userImage?: string | null;
  second?: boolean;
};

const UserGameDescription: FunctionComponent<Props> = ({
  username,
  image = "/images/Banner.png",
  font,
  userImage,
  second,
}) => {
  const src = userImage
    ? userImage
    : "https://api.dicebear.com/6.x/bottts-neutral/svg?seed=Bella";

  return (
    <div className="flex w-full h-auto items-center justify-center flex-col">
      {!second && (
        <div className="w-full ml-auto  mb-2">
          <img
            src={src}
            alt=""
            className="h-32 w-32 rounded-lg border-4 border-black"
          />
        </div>
      )}
      <div className="relative ">
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
      {second && (
        <div className="w-full flex justify-end mr-auto mt-2">
          <img
            src={src}
            alt=""
            className="h-32 w-32 rounded-lg border-4 border-black "
          />
        </div>
      )}
    </div>
  );
};

export default UserGameDescription;
