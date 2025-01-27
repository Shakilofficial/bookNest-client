import TextSkeleton from "./TextSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-2">
            <TextSkeleton width="w-[120px]" />
            <TextSkeleton width="w-[180px]" height="h-6" />
            <TextSkeleton width="w-[80px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSkeleton;
