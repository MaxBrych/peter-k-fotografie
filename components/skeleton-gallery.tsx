export function SkeletonGallery() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((colIndex) => (
          <div key={`col-${colIndex}`} className="flex flex-col gap-4">
            {[1, 2, 3].map((itemIndex) => (
              <div key={`item-${colIndex}-${itemIndex}`} className="w-full">
                <div className="relative aspect-[4/3] w-full bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
  
  