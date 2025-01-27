import Skeleton from "./Skeleton";

interface TextSkeletonProps {
  width?: string;
  height?: string;
}

const TextSkeleton = ({
  width = "w-full",
  height = "h-4",
}: TextSkeletonProps) => {
  return <Skeleton className={`${width} ${height}`} />;
};

export default TextSkeleton;
