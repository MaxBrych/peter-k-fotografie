import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"

interface BlogPostPreviewProps {
  post: {
    _id: string
    title: string
    slug: string
    publishedAt: string
    author: string
    excerpt?: string
    featuredImageUrl?: string
    collection?: {
      _id: string
      title: string
      slug: string
    }
  }
}

export function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
          {post.featuredImageUrl ? (
            <Image
              src={`${post.featuredImageUrl}?w=800&q=80`}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Kein Bild verfügbar</div>
          )}
        </div>
        <div className="mt-2 text-sm text-gray-600">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> • {post.author}
      </div>
        <h2 className="text-xl mt-2 font-medium group-hover:underline">{post.title}</h2>
      </Link>
     
      {post.excerpt && <p className="mt-2 text-gray-700 line-clamp-3">{post.excerpt}</p>}
      
    </article>
  )
}

