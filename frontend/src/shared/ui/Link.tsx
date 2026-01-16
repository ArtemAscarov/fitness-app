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
        "text-white hover:bg-[#ffffff10] transition duration-300 max-w-max rounded-sm lg:px-4 py-2 px-3";
      break;
    case "whiteHover":
      buttonVariant = "hover:text-white transition";
      break;
    default:
      buttonVariant =
        "bg-[#2563eb] text-white rounded-sm hover:bg-[#1e40af] transition duration-300 lg:px-4 lg:py-2.5 py-2 px-3";
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
