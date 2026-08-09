"use client";

import { getUserQueryOptions } from "@/entities/user/features/getUserQueryOptions";
import Link from "@/shared/ui/Link";
import { useQuery } from "@tanstack/react-query";

type Props = { id: number };

export default function EditExerciseButton({ id }: Props) {
  const { data } = useQuery(getUserQueryOptions());

  if (!data) return null;

  return (
    <Link
      href={`/admin/edit-exercise/${id}`}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
    >
      Редактировать
    </Link>
  );
}
