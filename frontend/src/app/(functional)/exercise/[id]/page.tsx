import { notFound } from "next/navigation";
import ExerciseDetail from "@/pages/ExerciseDetail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;



  // return <ExerciseDetail exercise={exercise} />;
}
