import React, { Suspense } from "react";
const Home = React.lazy(() => import("../../pages/Home/index"));

export default function page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Home />
    </Suspense>
  );
}
