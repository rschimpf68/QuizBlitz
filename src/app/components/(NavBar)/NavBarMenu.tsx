import Link from "next/link";
import Image from "next/legacy/image";
import MenuButton from "../buttons/B-Menu";

interface Props {}
const NavBarMenu: React.FC<Props> = ({}) => {
  return (
    <main className="w-full h-auto flex justify-center flex-row relative bg-cover bg-center z-10">
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center relative z-10">
          <div className="flex-1 flex justify-center items-center">
            <MenuButton
              href="/currentGames"
              unpressedImageUrl="/images/NavBar/ActivityUnpressed.png"
              pressedImageUrl="/images/NavBar/ActivityPressed.png"
              useLink={true}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <MenuButton
              href="/"
              unpressedImageUrl="/images/NavBar/HomeUnpressed.png"
              pressedImageUrl="/images/NavBar/HomePressed.png"
              useLink={true}
            />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <MenuButton
              href="/profile"
              unpressedImageUrl="/images/NavBar/ProfileUnpressed.png"
              pressedImageUrl="/images/NavBar/ProfilePressed.png"
              useLink={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
export default NavBarMenu;
