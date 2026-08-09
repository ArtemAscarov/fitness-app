"use client";

import Button from "@/shared/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

export default function PrevPageButton({}: Props) {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="gap-2 !px-3 text-gray-300"
    >
      <Image
        width={18}
        height={18}
        src="/svg/arrowRight.svg"
        alt=""
        className="rotate-180"
      />
      К каталогу
    </Button>
  );
}
