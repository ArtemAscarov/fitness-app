import CardSkeleton from "./CardSkeleton";

export default function ExercisesSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-2.5">
      <div className=" p-4 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
