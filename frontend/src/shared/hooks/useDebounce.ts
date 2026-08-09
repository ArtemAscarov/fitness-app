import { useEffect, useState } from "react";

type params = {
  text: string;
  delay?: number;
};

export function useDebounce({ text, delay = 400 }: params) {
  const [debouncedText, setDebouncedText] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const key = setTimeout(() => {
      setDebouncedText(text);
      setIsPending(false);
    }, delay);

    return () => clearTimeout(key);
  }, [text, delay]);

  return { debouncedText, isPending };
}
