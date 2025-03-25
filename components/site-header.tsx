import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="w-full py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            PETER KRÜGER
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/collections" className="text-sm hover:underline">
              Kollektionen
            </Link>
            <Link href="/blog" className="text-sm hover:underline">
              Blog
            </Link> 
            <Link href="/about" className="text-sm hover:underline">
              Über Mich
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Kontakt
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="https://instagram.com" className="text-gray-700 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://twitter.com" className="text-gray-700 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

