"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function DebugInfo() {
  const [showDebug, setShowDebug] = useState(false)
  const [envInfo, setEnvInfo] = useState<any>(null)

  const checkEnvironment = async () => {
    setEnvInfo({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      nodeEnv: process.env.NODE_ENV,
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      hasStripeKey: !!process.env.NEXT_PUBLIC_STRIPE_KEY, // Only for public key if you have one
      timestamp: new Date().toISOString(),
    })
    setShowDebug(true)
  }

  return (
    <div className="mt-8">
      <Button variant="outline" size="sm" onClick={checkEnvironment} className="text-xs">
        Check Environment
      </Button>

      {showDebug && envInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs font-mono overflow-auto">
          <pre>{JSON.stringify(envInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

