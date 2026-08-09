"use client";
import { getUserQueryOptions } from "@/entities/user/features/getUserQueryOptions";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { API } from "@/shared/lib/axios";
import { useModalStore } from "@/shared/stores/modalStore";
import Button from "@/shared/ui/button";
import Link from "@/shared/ui/Link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const { data } = useQuery(getUserQueryOptions());
  const queryClient = useQueryClient();
  const { openModal } = useModalStore((state) => state);
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search?.get("title") || "");
  const { debouncedText } = useDebounce({ text: searchInput });

  useEffect(() => {
    const newSearch = new URLSearchParams(search || "");

    const prevSearch = newSearch.get("title");
    if ((prevSearch || "") === debouncedText) return;

    debouncedText === ""
      ? newSearch.delete("title")
      : newSearch.set("title", debouncedText);

    newSearch.delete("page");

    router.push(`${pathname}?${newSearch.toString()}`);
  }, [debouncedText]);

  async function onLogOut() {
    const res = await API.post("/logout");

    if (res.data) {
      queryClient.resetQueries({ queryKey: ["exercise"] });
      queryClient.resetQueries({ queryKey: ["me"] });
      router.push("/exercise");
    }
  }

  return (
    <header className="py-2 px-4 bg-[#1e2939] top-0 z-10 sticky">
     
      <nav>
        <div className="max-w-[1600px] lg:gap-8 gap-5 w-full mx-auto flex items-center justify-between">
          {/* Лого */}
          <Link
            variant="glass"
            href="/exercise"
            className="flex items-center gap-2"
          >
            <h3 className="text-white lg:text-[20px] text-[14px] font-bold">
              ФитнесПро
            </h3>
          </Link>

          <form className="max-w-[700px] w-full hidden sm:block">
            <label className="bg-[#364153] rounded-[4px] w-full lg:px-[15px] px-2 lg:py-1 py flex gap-2.5 justify-between items-center">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="outline-none text-white w-full text-[12px] sm:text-[16px]"
                placeholder="Поиск упражнений..."
                type="text"
              />

              <Image alt="loop" width={20} height={20} src={"/svg/loop.svg"} />
            </label>
          </form>

          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => openModal({ key: "SelectCategory" })}
              variant="ghost"
            >
              <Image
                className="min-w-4"
                width={20}
                height={20}
                alt="filters"
                src={"/svg/filter.svg"}
              />
            </Button>

            {data?.role && data.role === "ADMIN" ? (
              <Link href="/admin/add-exercise" variant="ghost">
                <Image
                  className="min-w-4"
                  width={20}
                  height={20}
                  alt="addExercise"
                  src={"/svg/plus.svg"}
                />
              </Link>
            ) : null}

            <Link href={data ? "/favorite" : "/auth/login"} variant="ghost">
              <Image
                className="min-w-4"
                width={20}
                height={20}
                alt="favorites"
                src={"/svg/emptyHurt.svg"}
              />
            </Link>

            {data ? (
              <Button onClick={() => onLogOut()} variant="ghost">
                <Image
                  className="min-w-4"
                  width={24}
                  height={24}
                  alt="logout"
                  src={"/svg/logout.svg"}
                />
              </Button>
            ) : null}
          </div>
        </div>
      </nav>
       <form className="max-w-[700px] w-full sm:hidden mt-2">
        <label className="bg-[#364153] rounded-[4px] w-full lg:px-[15px] px-2 lg:py-1 py flex gap-2.5 justify-between items-center">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="outline-none text-white w-full text-[12px] sm:text-[16px]"
            placeholder="Поиск упражнений..."
            type="text"
          />
        </label>
      </form>
    </header>
  );
}
