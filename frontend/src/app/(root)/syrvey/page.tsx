import React, { Suspense } from "react";
import { SyrveySkeleton } from "@/shared/ui/skeletons";
const Syrvey = React.lazy(() => import("@/pages/Syrvey"));
type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<SyrveySkeleton />}>
      <Syrvey />
    </Suspense>
  );
}
