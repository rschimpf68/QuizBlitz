import Link from "next/link";
import Image from "next/legacy/image";
import MenuButton from "../buttons/B-Menu";

interface Props {}
const NavBarMenu: React.FC<Props> = ({}) => {
  return (
    <main className="w-full h-auto flex justify-center flex-row relative bg-cover bg-center z-10">
      <div className="w-full flex justify-center">
        <Image
          src="/images/NavBar/NavBarBackground.png"
          alt="Imagen de fondo"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
        />

        <div className="w-full flex justify-center relative z-10">
          <div className="flex-1 flex justify-center items-center">
            <MenuButton
              href="/currentGames"
              unpressedImageUrl="/images/NavBar/HomePush.png"
              pressedImageUrl="/images/NavBar/HomePush.png"
              useLink={false}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <MenuButton
              href="/"
              unpressedImageUrl="/images/NavBar/HomePush.png"
              pressedImageUrl="/images/NavBar/HomeP.png"
              useLink={false}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <MenuButton
              href="/currentGames"
              unpressedImageUrl="/images/NavBar/HomePush.png"
              pressedImageUrl="/images/NavBar/HomeP.png"
              useLink={false}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
export default NavBarMenu;
