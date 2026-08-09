import ExerciseDetail from "@/pages/ExerciseDetail";
import { getExerciseServerFetch } from "@/entities/exercise/api/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const data = await getExerciseServerFetch(id);

  return <ExerciseDetail exercise={data} />;
}
