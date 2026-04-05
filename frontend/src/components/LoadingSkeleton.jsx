function SkeletonBox({ className = '' }) {
  return (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
  );
}

export function ClubCardSkeleton() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <SkeletonBox className="h-6 w-3/4 mb-3" />
      <SkeletonBox className="h-4 w-1/3 mb-4" />
      <SkeletonBox className="h-4 w-full mb-2" />
      <SkeletonBox className="h-4 w-5/6 mb-6" />
      <SkeletonBox className="h-10 w-full" />
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
      <SkeletonBox className="h-6 w-1/2 mb-2" />
      <SkeletonBox className="h-4 w-1/4 mb-4" />
      <SkeletonBox className="h-9 w-32" />
    </div>
  );
}

export default SkeletonBox;