import Link from "next/link";
import Image from "next/image";
import NavBarComponent from "./NavBarComponent";

interface Props {}
const NavBarMenu: React.FC<Props> = ({}) => {
  return (
    <main className="w-full h-auto  flex  justify-center flex-row ">
      <NavBarComponent
        href="/currentGames"
        imageSrc="/images/NavBar/note.png"
        width={40}
        height={40}
      />
      <NavBarComponent
        href="/"
        imageSrc="/images/NavBar/home1.png"
        width={40}
        height={40}
      />
      <NavBarComponent
        href="/currentGames"
        imageSrc="/images/NavBar/user1.png"
        width={33}
        height={40}
      />
    </main>
  );
};
export default NavBarMenu;
