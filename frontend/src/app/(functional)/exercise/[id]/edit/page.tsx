import { notFound } from "next/navigation";
import ExerciseForm from "@/pages/ExerciseForm";
import { getExerciseById } from "@/entities/exercise/mock";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const exercise = getExerciseById(Number(id));

  if (!exercise) notFound();

  return <ExerciseForm exercise={exercise} />;
}
