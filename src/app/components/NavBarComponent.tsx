import Link from "next/link";
import Image from "next/image";

interface Props {
  href: string;
  imageSrc: string;
  width: number;
  height: number;
}
const NavBarComponent: React.FC<Props> = ({
  href,
  imageSrc,
  width,
  height,
}) => {
  return (
    <>
      <Link
        href={href}
        className=" flex justify-center w-1/3 bg-gray-400 py-1 hover:bg-gray-300 border-2 border-white"
      >
        <Image src={imageSrc} alt="Home" width={width} height={height} />
      </Link>
    </>
  );
};
export default NavBarComponent;
