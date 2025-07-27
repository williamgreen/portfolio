import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import Image from "next/image"
import Link from "next/link"

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={title || ""}
            width={file.details.image.width}
            height={file.details.image.height}
            className="rounded-lg w-full h-auto"
          />
        </div>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: any) => <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-2xl font-semibold mb-4 mt-6">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: any) => <h3 className="text-xl font-semibold mb-3 mt-5">{children}</h3>,
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="ml-4">{children}</li>,
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-muted-foreground pl-4 italic my-6 text-muted-foreground">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <Link
        href={node.data.uri}
        className="text-foreground underline hover:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
}

interface RichTextRendererProps {
  content: any
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) return null

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">{documentToReactComponents(content, options)}</div>
  )
}
