import Skeleton from "./Skeleton";
import TextSkeleton from "./TextSkeleton";

const GridSkeleton = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
          <Skeleton className="h-[140px] w-full rounded-lg" />
          <div className="mt-4 space-y-2">
            <TextSkeleton width="w-3/4" />
            <TextSkeleton width="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridSkeleton;
