import Stripe from "stripe"
import type { Photo, Collection } from "./types"

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
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&type=photo&id=${photo._id}`,
      cancel_url: `${baseUrl}/photos/${photo.slug}`,
      metadata: {
        type: "photo",
        photoId: photo._id,
      },
    })

    if (!session.url) {
      throw new Error("Failed to create checkout session URL")
    }

    return session.url
  } catch (error) {
    console.error("Stripe checkout error:", error)
    throw new Error(`Failed to create checkout session: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function createCollectionCheckoutSession(collection: Collection): Promise<string> {
  // Ensure we have a base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseUrl) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_BASE_URL")
  }

  if (!collection.price) {
    throw new Error("Collection price is required")
  }

  try {
    // Create product data
    const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData = {
      name: `Kollektion: ${collection.title}`,
    }

    // Only add description if it exists and is not empty
    if (collection.description && collection.description.trim() !== "") {
      productData.description = collection.description
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: productData,
            unit_amount: Math.round(collection.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&type=collection&id=${collection._id}`,
      cancel_url: `${baseUrl}/collections/${collection.slug}`,
      metadata: {
        type: "collection",
        collectionId: collection._id,
      },
    })

    if (!session.url) {
      throw new Error("Failed to create checkout session URL")
    }

    return session.url
  } catch (error) {
    console.error("Stripe collection checkout error:", error)
    throw new Error(
      `Failed to create collection checkout session: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

