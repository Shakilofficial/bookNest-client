import AvatarSkeleton from "./AvatarSkeleton";
import TextSkeleton from "./TextSkeleton";

const CardSkeleton = () => {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center gap-4">
        <AvatarSkeleton size="h-12 w-12" />
        <div className="space-y-2">
          <TextSkeleton width="w-[200px]" />
          <TextSkeleton width="w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
