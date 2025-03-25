import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Seite nicht gefunden</h1>
      <p className="text-muted-foreground mb-8 max-w-md">Das gesuchte Foto existiert nicht oder wurde verschoben.</p>
      <Link href="/">
        <Button>Zurück zur Galerie</Button>
      </Link>
    </div>
  )
}

