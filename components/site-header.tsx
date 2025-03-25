"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Twitter, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = "auto"
  }

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isMenuOpen])

  // Close menu on resize if screen becomes larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isMenuOpen])

  return (
    <header className="w-full py-6 relative z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight" onClick={closeMenu}>
            PETER KRÜGER
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/collections" className="text-sm hover:underline">
              Kollektionen
            </Link>
            <Link href="/blog" className="text-sm hover:underline">
              Blog
            </Link>
            <Link href="/about" className="text-sm hover:underline">
              Über uns
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
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden" aria-hidden="true" onClick={closeMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden shadow-xl",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 p-4">
          <Link href="/collections" className="text-xl py-4 hover:text-gray-600 w-full text-center" onClick={closeMenu}>
            Kollektionen
          </Link>
          <Link href="/blog" className="text-xl py-4 hover:text-gray-600 w-full text-center" onClick={closeMenu}>
            Blog
          </Link>
          <Link href="/about" className="text-xl py-4 hover:text-gray-600 w-full text-center" onClick={closeMenu}>
            Über uns
          </Link>
          <Link href="/contact" className="text-xl py-4 hover:text-gray-600 w-full text-center" onClick={closeMenu}>
            Kontakt
          </Link>

          <div className="flex items-center space-x-6 mt-8">
            <Link href="https://instagram.com" className="text-gray-700 hover:text-gray-900" onClick={closeMenu}>
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="https://twitter.com" className="text-gray-700 hover:text-gray-900" onClick={closeMenu}>
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

