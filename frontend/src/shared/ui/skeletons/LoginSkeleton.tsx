import Skeleton from "./Skeleton";

export default function LoginSkeleton() {
  return (
    <div className="min-h-[calc(100vh-400px)] px-2.5 py-10 flex items-center justify-center">
      <div className="flex w-full max-w-[400px] items-center justify-center bg-[#1E2939]">
        <div className="relative w-full max-w-md rounded-xl p-4 md:p-6">
          <div className="border-default flex items-center justify-between border-b pb-4 md:pb-5">
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="pt-4 md:pt-6">
            <div className="mb-4 space-y-2.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full rounded-sm" />
            </div>

            <div className="mb-6 space-y-2.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-11 w-full rounded-sm" />
            </div>

            <div className="my-6 flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="mx-auto my-2.5 h-10 w-full max-w-[200px]" />

            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
