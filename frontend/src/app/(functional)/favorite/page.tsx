import { getExercisesServerFetch } from "@/entities/exercise/api/server";
import { getExercisesQueryOptions } from "@/entities/exercise/features/getExercisesQueryOptions";
import Favorite from "@/pages/Favorite";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const queryClient = new QueryClient();
  const search = await searchParams;

  await queryClient.prefetchQuery({
    ...getExercisesQueryOptions({ isFavorite: true, ...search }),
    queryFn: () => getExercisesServerFetch({ isFavorite: true, ...search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Favorite />
    </HydrationBoundary>
  );
}
