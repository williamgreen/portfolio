import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WorkItem } from "@/lib/work"

function ArrowButton() {
  return (
    <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-all duration-300">
      <ArrowRight className="w-3 h-3 text-foreground" />
    </div>
  )
}

function NewBadge() {
  return (
    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium shadow-sm">
      New
    </span>
  )
}

interface WorkCardProps {
  item: WorkItem
  className?: string
  showFeatured?: boolean
}

export default function WorkCard({ item, className, showFeatured = false }: WorkCardProps) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className={cn("block aspect-square md:aspect-[2/1]", className)}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300">
        <div className="absolute top-4 right-4 z-20 md:hidden">
          <ArrowButton />
        </div>

        {item.coverImage && (
          <div
            className={cn(
              "absolute bottom-0 right-0 w-4/5 h-4/5 md:top-0 md:h-full md:w-auto md:aspect-square",
              !item.coverBleed && "md:right-6",
            )}
          >
            <Image
              src={item.coverImage.src}
              alt={item.coverImage.alt || item.title}
              fill
              className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="relative z-10 p-4 pr-12 h-full flex flex-col md:w-1/2 md:justify-center md:p-6">
          {showFeatured && item.featured && (
            <div className="flex mb-3 md:absolute md:top-6 md:left-6 md:mb-0">
              <NewBadge />
            </div>
          )}
          <div className="text-foreground">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{item.company}</h4>
              <span className="hidden md:inline-flex">
                <ArrowButton />
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{item.subtitle}</p>
            <span className="text-xs text-muted-foreground">{item.year}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
