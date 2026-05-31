import React, { Suspense } from "react";
import { FavoriteSkeleton } from "@/shared/ui/skeletons";

const Favorite = React.lazy(() => import("@/pages/Favorite"));
type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<FavoriteSkeleton />}>
      <Favorite />
    </Suspense>
  );
}
