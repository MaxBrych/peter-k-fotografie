import { SkeletonGallery } from "@/components/skeleton-gallery"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-center space-x-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mx-auto mb-4" />
        <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
      </div>

      <SkeletonGallery />
    </div>
  )
}

