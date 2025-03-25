import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface SuccessPageProps {
  searchParams: {
    session_id?: string
    type?: string
    id?: string
  }
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { type = "photo" } = searchParams

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Vielen Dank für Ihren Kauf!</h1>
        <p className="text-muted-foreground mb-8">
          {type === "collection" ? (
            <>
              Ihre Zahlung war erfolgreich und alle Fotos der Kollektion werden in Kürze zum Download bereitstehen. Wir
              haben eine Bestätigungs-E-Mail mit allen Details gesendet.
            </>
          ) : (
            <>
              Ihre Zahlung war erfolgreich und Ihr Foto wird in Kürze zum Download bereitstehen. Wir haben eine
              Bestätigungs-E-Mail mit allen Details gesendet.
            </>
          )}
        </p>
        <Link href="/">
          <Button>Zurück zur Galerie</Button>
        </Link>
      </div>
    </div>
  )
}

