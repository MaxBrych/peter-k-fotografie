export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
  
        <div className="max-w-3xl mx-auto">
          <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded mb-4" />
  
          <div className="flex items-center mb-6">
            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="mx-2">•</div>
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
          </div>
  
          <div className="relative aspect-[16/9] bg-gray-200 animate-pulse rounded-lg mb-8" />
  
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
              </div>
              <div className="mt-3 sm:mt-0 h-10 w-32 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
  
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-4 w-full bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  