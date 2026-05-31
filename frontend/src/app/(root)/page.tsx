import React, { Suspense } from "react";
import { HomeSkeleton } from "@/shared/ui/skeletons";
const Home = React.lazy(() => import("../../pages/Home/index"));

export default function page() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <Home />
    </Suspense>
  );
}
