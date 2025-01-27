import AvatarSkeleton from "./AvatarSkeleton";
import TextSkeleton from "./TextSkeleton";

const CommentSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <AvatarSkeleton size="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <TextSkeleton width="w-[120px]" />
          <TextSkeleton width="w-[100px]" />
          <TextSkeleton width="w-full" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
