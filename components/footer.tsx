import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-md font-bold">
              PETER KRÜGER
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <Link href="/terms" className="hover:text-gray-600 transition">
              Impressum
            </Link>
            <Link href="/privacy" className="hover:text-gray-600 transition">
              Datenschutzerklärung
            </Link>
            <Link href="/contact" className="hover:text-gray-600 transition">
              Kontakt
            </Link>
          </div>

          <div className="mt-4 md:mt-0 text-sm text-gray-500">&copy; {currentYear} PETER KRÜGER Fotografie</div>
        </div>
      </div>
    </footer>
  )
}

