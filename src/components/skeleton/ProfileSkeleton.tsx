import AvatarSkeleton from "./AvatarSkeleton";
import TextSkeleton from "./TextSkeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <AvatarSkeleton size="h-20 w-20" />
        <div className="space-y-2">
          <TextSkeleton width="w-[200px]" height="h-6" />
          <TextSkeleton width="w-[150px]" />
        </div>
      </div>
      <div className="space-y-4">
        <TextSkeleton width="w-full" />
        <TextSkeleton width="w-full" />
        <TextSkeleton width="w-3/4" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
