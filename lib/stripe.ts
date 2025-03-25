import Stripe from "stripe"
import type { Photo } from "./types"

// Check if the STRIPE_SECRET_KEY is available
const stripeSecretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_STRIPE_SECRET_KEY")
}

// Initialize Stripe with the secret key
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
})

export async function createCheckoutSession(photo: Photo): Promise<string> {
  // Ensure we have a base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseUrl) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_BASE_URL")
  }

  // Log environment information (will only show in server logs)
  console.log("Environment:", {
    nodeEnv: process.env.NODE_ENV,
    baseUrl,
    hasStripeKey: !!stripeSecretKey,
    photoId: photo._id,
    photoTitle: photo.title,
  })

  try {
    // Create product data with conditional description
    const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData = {
      name: photo.title || "Photo",
    }

    // Only add images if the URL exists and is not empty
    if (photo.imageUrl && photo.imageUrl.trim() !== "") {
      productData.images = [photo.imageUrl]
    }

    // Only add description if it exists and is not empty
    if (photo.description && photo.description.trim() !== "") {
      productData.description = photo.description
    }

    // Log the checkout session parameters (sensitive info redacted)
    console.log("Creating checkout session with params:", {
      mode: "payment",
      hasProductData: !!productData,
      currency: "eur",
      amount: Math.round(photo.price * 100),
      successUrl: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/photos/${photo.slug}`,
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: productData,
            unit_amount: Math.round(photo.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/photos/${photo.slug}`,
    })

    if (!session.url) {
      throw new Error("Failed to create checkout session URL")
    }

    console.log("Checkout session created successfully:", {
      sessionId: session.id,
      hasUrl: !!session.url,
    })

    return session.url
  } catch (error) {
    // Enhanced error logging
    console.error("Stripe checkout error details:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      photo: {
        id: photo._id,
        title: photo.title,
        hasDescription: !!photo.description,
        hasImageUrl: !!photo.imageUrl,
      },
    })

    throw new Error(`Failed to create checkout session: ${error instanceof Error ? error.message : String(error)}`)
  }
}

