import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import BottomNavigation from "@/components/bottom-navigation"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"
import { getWorkItem, getWorkItems } from "@/lib/contentful"
import RichTextRenderer from "@/components/rich-text-renderer"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const workItems = await getWorkItems()
  return workItems.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const workItem = await getWorkItem(slug)
  
  if (!workItem) {
    return {
      title: 'Work',
    }
  }

  return {
    title: workItem.company,
  }
}

export default async function WorkItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = await getWorkItem(slug)

  if (!work) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: work.title }]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{work.title}</h1>
          <p className="text-muted-foreground text-lg">{work.subtitle}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 text-sm">
          <div className="text-muted-foreground">Company</div>
          <div className="text-foreground">{work.company}</div>

          <div className="text-muted-foreground">Year</div>
          <div className="text-foreground">{work.year}</div>
        </div>

        {/* Website Button */}
        {work.websiteLink && (
          <Link href={work.websiteLink} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="mb-8 bg-transparent">
              Website
              <ArrowUpRight className="w-4 h-4 -ml-1 align-middle" />
            </Button>
          </Link>
        )}

        {/* Cover Image */}
        {work.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden bg-gray-50">
            <Image
              src={`https:${work.coverImage.fields.file.url}`}
              alt={work.coverImage.fields.title || work.title}
              width={work.coverImage.fields.file.details.image.width}
              height={work.coverImage.fields.file.details.image.height}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Rich Text Content */}
        <div className="mb-12">
          {work.bodyContent ? (
            <RichTextRenderer content={work.bodyContent} />
          ) : (
            <p className="text-muted-foreground">No content available for this work item.</p>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <BottomNavigation />
    </div>
  )
}
