import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4 mt-6">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mb-3 mt-5">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="ml-4">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-6 text-muted-foreground">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <Link
              href={href || "#"}
              className="text-foreground underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </Link>
          ),
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null
            return (
              <div className="my-8">
                <Image src={src} alt={alt || ""} width={1200} height={800} className="rounded-lg w-full h-auto" />
              </div>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
