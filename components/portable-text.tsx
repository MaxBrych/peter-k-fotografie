"use client"

import Image from "next/image"
import { PortableText as PortableTextComponent } from "@portabletext/react"

interface PortableTextProps {
  value: any
}

export function PortableText({ value }: PortableTextProps) {
  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null
        }

        return (
          <div className="my-8 relative">
            <div className="relative aspect-[16/9]">
              <Image
                src={`${value.asset.url}?w=1200&q=80`}
                alt={value.alt || ""}
                fill
                className="object-cover rounded-md"
              />
            </div>
            {value.caption && <div className="mt-2 text-sm text-gray-600 text-center">{value.caption}</div>}
          </div>
        )
      },
    },
    block: {
      h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">{children}</blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
        return (
          <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
            {children}
          </a>
        )
      },
      strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
      number: ({ children }: any) => <li className="mb-1">{children}</li>,
    },
  }

  return <PortableTextComponent value={value} components={components} />
}

