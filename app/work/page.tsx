import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
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
      <div className="max-w-2xl mx-auto px-6 py-12 min-h-[calc(100vh-1rem)] flex flex-col">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold">A few bits of my work</h1>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 flex-grow">
          {workItems.length > 0 ? (
            workItems.map((item, index) => (
              <Link key={index} href={`/work/${item.slug}`}>
                <div className="group cursor-pointer">
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-lg bg-gray-50 mb-4 aspect-square">
                    {item.coverImage ? (
                      <Image
                        src={`https:${item.coverImage.fields.file.url}`}
                        alt={item.coverImage.fields.title || item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg group-hover:text-muted-foreground transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{item.subtitle}</span>
                      <span className="text-muted-foreground">{item.year}</span>
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
        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
