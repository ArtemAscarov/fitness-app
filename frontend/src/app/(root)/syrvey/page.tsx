import React, { Suspense } from "react";
const Syrvey = React.lazy(() => import("@/pages/Syrvey"));
type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Syrvey />
    </Suspense>
  );
}
