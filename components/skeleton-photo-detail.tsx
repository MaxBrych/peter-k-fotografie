export function SkeletonPhotoDetail() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - Image skeleton */}
          <div className="relative aspect-[4/3] h-auto bg-gray-200 animate-pulse" />
  
          {/* Right column - Details skeleton */}
          <div className="flex flex-col">
            <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />
  
            <div className="mb-6 mt-2">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full" />
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full" />
              </div>
            </div>
  
            <div className="h-7 w-20 bg-gray-200 animate-pulse rounded mb-6" />
  
            <div className="space-y-2 mb-8">
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-4/6 bg-gray-200 animate-pulse rounded" />
            </div>
  
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full mr-2 mt-1" />
                    <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
  
            <div className="mt-auto">
              <div className="h-12 w-full bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  