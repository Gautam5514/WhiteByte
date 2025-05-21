import { Skeleton } from '@/components/ui/skeleton';

export default function ProductGridSkeleton() {
  // Create an array of 6 items to render skeleton cards
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {skeletonItems.map((i) => (
        <div key={i} className="bg-card rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
          {/* Image skeleton */}
          <Skeleton className="w-full aspect-square" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-9 w-full mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}