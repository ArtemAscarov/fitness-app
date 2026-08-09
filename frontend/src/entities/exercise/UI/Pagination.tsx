"use client";

import Button from "@/shared/ui/button";
import Image from "next/image";
import { usePagination } from "../hooks/usePagination";
import { PaginationResultType } from "@/shared/types/type";

type Props<T> = {
  data: PaginationResultType<T>;
};

export default function Pagination<T>({ data }: Props<T>) {
  const { changePage, page } = usePagination();

  if (!data?.count) return null;

  return (
    <div className="flex gap-4 items-center flex-1 items-end justify-center my-4">
      <Button
        disabled={!data?.isHasPrev}
        className={!data?.isHasPrev ? "hover:scale-100 brightness-50" : ""}
        variant="ghost"
        onClick={() => {
          changePage("prew");
        }}
      >
        <Image
          width={26}
          height={26}
          alt="previousPage"
          className="rotate-180"
          src={"/svg/arrowRight.svg"}
        />
      </Button>

      <div className="flex items-center gap-2">
        {[...Array(data?.pageCount)].map((_, i) => (
          <Button
            key={i}
            onClick={() => {
              changePage(i + 1);
            }}
            disabled={i + 1 === +page}
            className={
              i + 1 === +page
                ? "border-[#71a48f] border-2 block rounded-full w-9 text-neutral-400 justify-center hover:scale-100"
                : ""
            }
            variant="ghost"
          >
            {i + 1}
          </Button>
        ))}
      </div>

      <Button
        disabled={!data?.isHasNext}
        className={!data?.isHasNext ? "hover:scale-100 brightness-50" : ""}
        variant="ghost"
        onClick={() => {
          changePage("next");
        }}
      >
        <Image
          width={26}
          height={26}
          alt="NextPage"
          src={"/svg/arrowRight.svg"}
        />
      </Button>
    </div>
  );
}
