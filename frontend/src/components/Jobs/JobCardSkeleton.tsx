export const JobCardSkeleton = () => {
  return (
    <div className="border rounded-xl p-4 shadow-sm animate-pulse flex flex-col md:flex-row gap-4">
      <div className="bg-gray-300 w-full md:w-32 h-24 rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
        <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
        <div className="h-3 bg-gray-200 w-1/3 rounded mt-2"></div>
      </div>
    </div>
  );
};