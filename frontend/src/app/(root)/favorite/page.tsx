import React, { Suspense } from "react";

const Favorite = React.lazy(() => import("@/pages/Favorite"));
type Props = {};

export default function page({}: Props) {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Favorite />
    </Suspense>
  );
}
