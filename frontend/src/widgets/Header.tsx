"use client";
import Button from "@/shared/ui/button";
import Link from "@/shared/ui/Link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-2 px-4 bg-[#1e2939] relative">
      <nav>
        <div className="max-w-[1600px] lg:gap-8 gap-5 w-full mx-auto flex items-center justify-between">
          {/* Лого */}
          <Link variant="glass" href="/" className="flex items-center gap-2">
            <h3 className="text-white lg:text-[20px] text-[14px] font-bold">
              ФитнесПро
            </h3>
          </Link>

          <div className="max-w-[700px] w-full">
            <label className="bg-[#364153] rounded-[4px] w-full lg:px-[15px] px-2 lg:py-1 py flex gap-2.5 justify-between items-center">
              <input
                className="outline-none text-white w-full text-[12px] sm:text-[16px]"
                placeholder="Поиск упражнений..."
                type="text"
              />
              <Button variant="ghost" type="submit">
                <Image
                  alt="loop"
                  width={20}
                  height={20}
                  src={"/svg/loop.svg"}
                />
              </Button>
            </label>
          </div>

          <div className="flex items-center justify-center sm:gap-4 gap-2">
            <Button variant="ghost">
              <Image
                className="min-w-4"
                width={24}
                height={24}
                alt="filters"
                src={"/svg/filter.svg"}
              />
            </Button>

            <Button variant="ghost">
              <Image
                className="min-w-4"
                width={24}
                height={24}
                alt="filters"
                src={"/svg/plus.svg"}
              />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
