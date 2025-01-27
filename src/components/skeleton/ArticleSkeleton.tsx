import Skeleton from "./Skeleton";
import TextSkeleton from "./TextSkeleton";

const ArticleSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-[240px] w-full rounded-xl" />
      <div className="space-y-4">
        <TextSkeleton width="w-3/4" height="h-6" />
        <TextSkeleton width="w-full" />
        <TextSkeleton width="w-full" />
        <TextSkeleton width="w-2/3" />
      </div>
    </div>
  );
};

export default ArticleSkeleton;
