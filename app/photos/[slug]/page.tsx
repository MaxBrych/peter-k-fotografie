import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchPhotoBySlug, fetchCollections } from "@/lib/sanity"
import CheckoutButton from "@/components/checkout-button"

interface PhotoPageProps {
  params: {
    slug: string
  }
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  let photo

  try {
    photo = await fetchPhotoBySlug(params.slug)
  } catch (error) {
    console.error("Error fetching photo:", error)
  }

  if (!photo) {
    notFound()
  }

  let collections = []

  try {
    collections = await fetchCollections()
  } catch (error) {
    console.error("Error fetching collections:", error)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="text-sm text-gray-600 hover:text-black hover:underline">
          ← Zurück zur Galerie
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left column - Image */}
        <div className="relative aspect-[4/3] h-auto">
          <Image
            src={`${photo.imageUrl}?w=1200&q=80`} // Medium quality preview
            alt={photo.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Right column - Details */}
        <div className="flex flex-col">
         

          {photo.collections && photo.collections.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {photo.collections.map((collection) => (
                  <Link
                    key={collection._id}
                    href={`/collections/${collection.slug}`}
                    className="text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
                  >
                    {collection.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
 <h1 className="text-3xl font-medium mb-2">{photo.title}</h1>
          <div className="text-xl font-medium mb-6">€{photo.price.toFixed(2)}</div>

          <div className="prose max-w-none mb-8">
            <p>{photo.description || "Keine Beschreibung verfügbar."}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-2">Im Kauf enthalten:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Bild in voller Auflösung (4000x3000px)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ohne Wasserzeichen</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Persönliche und kommerzielle Nutzungsrechte</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Sofortiger Download nach dem Kauf</span>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <CheckoutButton photo={photo} />
          </div>
        </div>
      </div>
    </div>
  )
}

