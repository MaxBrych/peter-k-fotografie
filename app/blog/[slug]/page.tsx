import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchBlogPostBySlug } from "@/lib/sanity"
import { formatDate } from "@/lib/utils"
import { PortableText } from "@/components/portable-text"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-gray-600 hover:text-black hover:underline">
          ← Zurück zum Blog
        </Link>
      </div>

      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-gray-600 mb-6">
            <time dateTime={post.publishedAt} className="text-sm">
              {formatDate(post.publishedAt)}
            </time>
            <span className="mx-2">•</span>
            <span className="text-sm">{post.author}</span>
          </div>

          {post.featuredImageUrl && (
            <div className="relative aspect-[16/9] mb-8">
              <Image
                src={`${post.featuredImageUrl}?w=1200&q=90`}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}

          {post.collection && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">Zugehörige Kollektion</h3>
                  <p className="text-gray-600">{post.collection.title}</p>
                </div>
                <Link
                  href={`/collections/${post.collection.slug}`}
                  className="mt-3 sm:mt-0 inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm"
                >
                  Kollektion ansehen
                </Link>
              </div>
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <PortableText value={post.content} />
        </div>
      </article>
    </div>
  )
}

