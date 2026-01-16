import { cn } from "../lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: "ghost" | "default" | "glass";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  className,
  variant = "default",
  onClick,
  type = "button",
}: Props) {
  let buttonVariant = "";
  switch (variant) {
    case "glass":
      buttonVariant = "rounded-sm";
      break;
    case "ghost":
      buttonVariant =
        "text-white hover:bg-[#ffffff34] transition duration-300 max-w-max rounded-sm";
      break;
    default:
      buttonVariant =
        "bg-[#2563eb] text-white rounded-sm hover:bg-[#1e40af] transition duration-300";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "lg:px-4 lg:py-2.5 py-2 px-3 flex items-center cursor-pointer",
        buttonVariant,
        className
      )}
    >
      {children}
    </button>
  );
}
