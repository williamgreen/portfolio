import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
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
  const allWorkItems = await getWorkItems()

  if (!work) {
    notFound()
  }

  // Get other work items (excluding current one) for "More work" section
  const otherWorkItems = allWorkItems.filter(item => item.slug !== slug).slice(0, 2)

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
        <div className="grid gap-x-6 gap-y-4 mb-6 text-sm" style={{gridTemplateColumns: 'auto 1fr'}}>
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

        {/* More work section */}
        {otherWorkItems.length > 0 && (
          <div className="mb-12">
            <h3 className="font-semibold mb-6">More work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherWorkItems.map((item, index) => (
                <Link key={index} href={`/work/${item.slug}`} className="block">
                  <div className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300 aspect-square">
                    {/* Arrow Icon */}
                    <div className="absolute top-4 right-4 z-20">
                      <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-all duration-300">
                        <ArrowRight className="w-3 h-3 text-foreground" />
                      </div>
                    </div>

                    {/* Background Image - positioned at bottom right */}
                    {item.coverImage && (
                      <div className="absolute bottom-0 right-0 w-4/5 h-4/5">
                        <Image
                          src={`https:${item.coverImage.fields.file.url}`}
                          alt={item.coverImage.fields.title || item.title}
                          fill
                          className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Content - positioned at top left */}
                    <div className="relative z-10 p-4 h-full flex flex-col">
                      <div className="text-foreground">
                        <h4 className="font-semibold text-sm mb-1">{item.company}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{item.subtitle}</p>
                        <span className="text-xs text-muted-foreground">{item.year}</span>
                      </div>
                    </div>

                    {/* New label for featured items */}
                    {item.featured && (
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium">
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>

      <BottomNavigation />
    </div>
  )
}
