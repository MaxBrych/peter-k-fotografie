export function SkeletonCollections() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mx-auto mb-12" />
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <div className="relative aspect-[4/3] mb-4 bg-gray-200 animate-pulse" />
              <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  