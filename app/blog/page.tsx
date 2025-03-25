import { fetchBlogPosts } from "@/lib/sanity"
import { BlogPostPreview } from "@/components/blog-post-preview"

export const metadata = {
  title: "Blog | TALVA Fotografie",
  description: "Lesen Sie unsere neuesten Blogbeiträge über Fotografie und Reisen",
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium text-center mb-12">Blog</h1>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostPreview key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Noch keine Blogbeiträge verfügbar.</p>
      )}
    </div>
  )
}

