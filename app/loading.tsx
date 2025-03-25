import { SkeletonGallery } from "@/components/skeleton-gallery"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-center space-x-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>

      <SkeletonGallery />
    </div>
  )
}

