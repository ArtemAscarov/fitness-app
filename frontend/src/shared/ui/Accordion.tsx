"use client";

import Image from "next/image";
import useToggle from "../hooks/useToggle";
import { cn } from "../lib/cn";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  name: string;
};

export default function Accordion({ children, name }: Props) {
  const [state, toggle] = useToggle(false);

  return (
    <div
      className={cn(
        "transition-all duration-100 overflow-hidden",
        state ? "max-h-full" : "max-h-[25px]"
      )}
    >
      <div
        onClick={toggle}
        className="flex gap-[15px] ml-1.5 items-center mb-2.5 cursor-pointer h-[25px]"
      >
        <p className="text-white text-[16px] font-semibold">{name}</p>
        <Image
          className={cn("duration-150 transition-all", state ? "" : "rotate-180")}
          alt="arrowTop"
          width={20}
          height={20}
          src={"/svg/arrowTop.svg"}
        />
      </div>

      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}
