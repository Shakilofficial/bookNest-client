import Skeleton from "./Skeleton";

interface AvatarSkeletonProps {
  size?: string;
}

const AvatarSkeleton = ({ size = "h-8 w-8" }: AvatarSkeletonProps) => {
  return <Skeleton className={`${size} rounded-full`} />;
};

export default AvatarSkeleton;
