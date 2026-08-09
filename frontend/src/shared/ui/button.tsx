import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "ghost" | "default" | "glass";
  type?: "button" | "submit" | "reset";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className,
  variant = "default",
  onClick,
  type = "button",
  ...parametes
}: Props) {
  let buttonVariant = "";
  switch (variant) {
    case "glass":
      buttonVariant = "lg:px-4 lg:py-2.5 py-2 px-3 rounded-sm";
      break;
    case "ghost":
      buttonVariant =
        "text-white transition duration-300 rounded-sm hover:scale-110 p-2";
      break;
    default:
      buttonVariant =
        "lg:px-4 lg:py-2.5 py-2 px-3 bg-gradient-to-r from-blue-900 hover:to-red-800 hover:from-blue-800 to-red-900 text-white rounded-sm transition duration-300 lg:px-4 lg:py-2.5 py-2 px-3";
  }

  return (
    <button
      {...parametes}
      type={type}
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer",
        buttonVariant,
        className,
      )}
    >
      {children}
    </button>
  );
}
