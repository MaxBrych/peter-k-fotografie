import { NextResponse } from "next/server"

export async function GET() {
  // Only check if environment variables exist, don't expose actual values
  const envStatus = {
    hasStripeSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
    baseUrlValue: process.env.NEXT_PUBLIC_BASE_URL, 
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  }

  return NextResponse.json(envStatus)
}

