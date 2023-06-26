"use client";
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  answered?: boolean;
  correct?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  onClick,
  answered,
  correct,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` my-5 flex  w-full items-center justify-center rounded-md border-2 py-4 text-lg  text-black outline-none transition-all duration-200 hover:scale-105 disabled:pointer-events-none  ${
        answered ? (correct ? "bg-green-100" : "bg-red-100") : "bg-white"
      }`}
    >
      {label}
    </button>
  );
};
export default Button;
