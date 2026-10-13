import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import CoverVideo from "@/components/cover-video"
import { cn } from "@/lib/utils"
import type { WorkItem } from "@/lib/work"

function ArrowButton({ external = false }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight
  return (
    <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-all duration-300">
      <Icon className="w-3 h-3 text-foreground" />
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
  const external = Boolean(item.externalLink)

  return (
    <Link
      href={item.externalLink ?? `/work/${item.slug}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "block col-span-1 aspect-square",
        item.wide && "md:col-span-2 md:aspect-[2/1]",
        className,
      )}
    >
      <div className="group relative h-full overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300">
        <div className={cn("absolute top-4 right-4 z-20", item.wide && "md:hidden")}>
          <ArrowButton external={external} />
        </div>

        {(item.coverImage || item.coverVideo) && (
          <div
            className={cn(
              "absolute bottom-0 w-4/5 h-4/5",
              // Art that's cropped by its own right edge (a laptop) sits flush with the
              // card; anything else is centred under the text when stacked
              item.coverBleed ? "right-0" : "inset-x-0 mx-auto",
              item.wide && "md:top-0 md:left-auto md:right-6 md:mx-0 md:h-full md:w-auto md:aspect-square",
              item.wide && item.coverBleed && "md:right-0",
            )}
          >
            {item.coverVideo ? (
              <CoverVideo
                sources={item.coverVideo}
                poster={item.coverPoster ?? item.coverImage?.src}
                still={item.coverImage?.src}
                label={item.coverImage?.alt || item.title}
                className="group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              item.coverImage && (
                <Image
                  src={item.coverImage.src}
                  alt={item.coverImage.alt || item.title}
                  fill
                  className="object-contain object-bottom-right group-hover:scale-105 transition-transform duration-300"
                />
              )
            )}
          </div>
        )}

        <div
          className={cn(
            "relative z-10 p-4 pr-12 h-full flex flex-col",
            item.wide && "md:w-1/2 md:justify-center md:p-6",
          )}
        >
          <div className="text-foreground">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{item.company}</h4>
              {showFeatured && item.featured && <NewBadge />}
              {item.wide && (
                <span className="hidden md:inline-flex">
                  <ArrowButton external={external} />
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-1">{item.subtitle}</p>
            <span className="text-xs text-muted-foreground">{item.year}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
