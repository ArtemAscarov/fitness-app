import { notFound } from "next/navigation";
import ExcerciseDetail from "@/pages/ExcerciseDetail";
import { getExcerciseById } from "@/entities/excercise/mock";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const excercise = getExcerciseById(Number(id));

  if (!excercise) notFound();

  return <ExcerciseDetail excercise={excercise} />;
}
