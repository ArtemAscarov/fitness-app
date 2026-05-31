import { cn } from "@/shared/lib/cn";

type Props = {
  className?: string;
};

/**
 * Базовый блок-плейсхолдер. Через className задаётся размер/форма,
 * пульсация и фон уже встроены.
 */
export default function Skeleton({ className }: Props) {
  return (
    <div className={cn("animate-pulse rounded-md bg-white/10", className)} />
  );
}
