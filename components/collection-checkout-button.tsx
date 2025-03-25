"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { Collection } from "@/lib/types"
import { createCollectionCheckoutSession } from "@/lib/stripe"

interface CollectionCheckoutButtonProps {
  collection: Collection
  photoCount: number
}

export default function CollectionCheckoutButton({ collection, photoCount }: CollectionCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      setErrorDetails(null)

      const url = await createCollectionCheckoutSession(collection)

      // Use a short timeout to ensure logs are sent before redirect
      setTimeout(() => {
        window.location.href = url
      }, 100)
    } catch (error) {
      console.error("Collection checkout error:", error)

      // Store error details for debugging
      setErrorDetails(`${error instanceof Error ? error.message : String(error)}`)

      toast({
        title: "Zahlungsfehler",
        description:
          "Bei der Verarbeitung Ihrer Zahlung ist ein Problem aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support.",
        variant: "destructive",
      })

      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className="w-full bg-black text-white hover:bg-gray-800 py-6 text-base"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Wird bearbeitet...
          </span>
        ) : (
          `Komplette Kollektion kaufen (${photoCount} Fotos)`
        )}
      </Button>

      {errorDetails && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-xs font-mono overflow-auto max-h-40">
          <p className="text-red-600 mb-2">Fehlerdetails (für Support):</p>
          <pre className="whitespace-pre-wrap break-words">{errorDetails}</pre>
        </div>
      )}
    </div>
  )
}

