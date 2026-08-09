import { usePathname, useRouter, useSearchParams } from "next/navigation";


export function usePagination() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams?.get("page") || 1;

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams || "");
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const changePage = (value: "next" | "prew" | number) => {
    if (value === "next") setPage(+page + 1);
    else if (value === "prew") setPage(+page - 1);
    else {
      setPage(value);
    }
  };

  return { page, changePage, setPage };
}
