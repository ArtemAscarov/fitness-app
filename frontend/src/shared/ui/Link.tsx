import NextLink from "next/link";
import { cn } from "../lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "ghost" | "default" | "glass" | "whiteHover";
  href?: string;
  onClick?: () => void;
};

export default function Link({
  children,
  className,
  onClick,
  variant = "default",
  href = "",
}: Props) {
  let buttonVariant = "";
  switch (variant) {
    case "glass":
      buttonVariant = "rounded-sm";
      break;
    case "ghost":
      buttonVariant =
        "text-white transition duration-300 max-w-max rounded-sm hover:scale-120 p-2";
      break;
    case "whiteHover":
      buttonVariant = "hover:text-white transition";
      break;
    default:
      buttonVariant =
        "bg-gradient-to-r from-blue-900 hover:to-red-800 hover:from-blue-800 to-red-900 text-white rounded-sm transition duration-300 lg:px-4 lg:py-2.5 py-2 px-3";
  }

  return (
    <NextLink
      onClick={onClick}
      href={href}
      className={cn(
        "flex items-center cursor-pointer",
        buttonVariant,
        className
      )}
    >
      {children}
    </NextLink>
  );
}
