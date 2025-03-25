export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-40 bg-gray-200 animate-pulse rounded mx-auto mb-12" />
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="relative aspect-[16/9] bg-gray-200 animate-pulse" />
              <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  