import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import BottomNavigation from "@/components/bottom-navigation"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"
import { getWorkItems } from "@/lib/contentful"

export const metadata: Metadata = {
  title: 'Work',
}

export default async function WorkPage() {
  const workItems = await getWorkItems()

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold">A few bits of my work</h1>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
          {workItems.length > 0 ? (
            workItems.map((item, index) => (
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
                      <h4 className="font-medium mb-1">{item.company}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{item.subtitle}</p>
                      <span className="text-xs text-muted-foreground">{item.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Fallback content when no Contentful items are found
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No work items found. Please check your Contentful setup.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>

      <BottomNavigation />
    </div>
  )
}
