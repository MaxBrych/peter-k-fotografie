import Link from "next/link"
import { notFound } from "next/navigation"
import PhotoGallery from "@/components/photo-gallery"
import { BlogPostPreview } from "@/components/blog-post-preview"
import {
  fetchCollectionBySlug,
  fetchPhotosByCollection,
  fetchCollections,
  fetchBlogPostsByCollection,
} from "@/lib/sanity"

interface CollectionPageProps {
  params: {
    slug: string
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  let collection

  try {
    collection = await fetchCollectionBySlug(params.slug)
  } catch (error) {
    console.error("Error fetching collection:", error)
  }

  if (!collection) {
    notFound()
  }

  let photos: string | any[] = []
  let collections: any[] = []
  let relatedPosts = []

  try {
    photos = await fetchPhotosByCollection(collection._id)
    collections = await fetchCollections()
    relatedPosts = await fetchBlogPostsByCollection(collection._id)
  } catch (error) {
    console.error("Error fetching data:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-center space-x-6 flex-wrap">
        {collections.map((col) => (
          <Link
            key={col._id}
            href={`/collections/${col.slug}`}
            className={`text-sm ${col.slug === params.slug ? "text-black font-medium" : "text-gray-600"} hover:text-black hover:underline mb-2`}
          >
            {col.title}
          </Link>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-medium mb-4">{collection.title}</h1>
        {collection.description && <p className="text-gray-600">{collection.description}</p>}
      </div>

      {photos.length > 0 ? (
        <PhotoGallery photos={photos} />
      ) : (
        <p className="text-center text-gray-600">Keine Fotos in dieser Kollektion gefunden.</p>
      )}

      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-medium text-center mb-8">Zugehörige Blogbeiträge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <BlogPostPreview key={post._id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

