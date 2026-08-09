import { useEffect } from "react";

export function useBlockScroll(blocked: boolean) {
  useEffect(() => {
    if (!blocked) return;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [blocked]);
}
