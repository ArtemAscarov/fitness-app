import { ReactNode } from "react";
import { cn } from "../lib/cn";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function AlertText({ className, children }: Props) {
  return (
    <p className={cn(["text-[16px] text-red-600 my-1.5", className])}>{children}</p>
  );
}
