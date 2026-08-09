import ExerciseForm from "@/pages/ExerciseForm";
import { getExerciseServerFetch } from "@/entities/exercise/api/server";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const exercise = await getExerciseServerFetch(id);

  if (!exercise) {
    redirect("/exercise");
  }

  return <ExerciseForm exercise={exercise} />;
}
