import AvatarSkeleton from "./AvatarSkeleton";
import TextSkeleton from "./TextSkeleton";

const TableRowSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4">
      <AvatarSkeleton size="h-12 w-12" />
      <div className="space-y-2">
        <TextSkeleton width="w-[250px]" />
        <TextSkeleton width="w-[200px]" />
      </div>
    </div>
  );
};

export default TableRowSkeleton;
