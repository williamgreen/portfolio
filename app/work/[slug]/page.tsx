import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottom-navigation";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import AnimateOnScroll from "@/components/animate-on-scroll";
import MarkdownContent from "@/components/markdown-content";
import WorkCard from "@/components/work-card";
import { getWorkItem, getWorkItems } from "@/lib/work";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const workItems = await getWorkItems();
  return workItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workItem = await getWorkItem(slug);

  if (!workItem) {
    return {
      title: "Work",
    };
  }

  return {
    title: workItem.company,
  };
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getWorkItem(slug);
  const allWorkItems = await getWorkItems();

  if (!work) {
    notFound();
  }

  // Get other work items (excluding current one) for "More work" section
  const otherWorkItems = allWorkItems
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <AnimateOnScroll loadOnMount={true}>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Work", href: "/work" },
              { label: work.title },
            ]}
          />
        </AnimateOnScroll>

        {/* Header */}
        <AnimateOnScroll loadOnMount={true}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{work.title}</h1>
            <p className="text-muted-foreground text-lg">{work.subtitle}</p>
          </div>
        </AnimateOnScroll>

        {/* Details Grid */}
        <AnimateOnScroll loadOnMount={true}>
          <div
            className="grid gap-x-6 gap-y-4 mb-6 text-sm"
            style={{ gridTemplateColumns: "auto 1fr" }}
          >
            <div className="text-muted-foreground">Company</div>
            <div className="text-foreground">{work.company}</div>

            <div className="text-muted-foreground">Year</div>
            <div className="text-foreground">{work.year}</div>
          </div>
        </AnimateOnScroll>

        {/* Website Button */}
        {work.websiteLink && (
          <AnimateOnScroll loadOnMount={true}>
            <Link
              href={work.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="mb-8 bg-transparent">
                Website
                <ArrowUpRight className="w-4 h-4 -ml-1 align-middle" />
              </Button>
            </Link>
          </AnimateOnScroll>
        )}

        {/* Cover Image */}
        {work.coverImage && (
          <AnimateOnScroll loadOnMount={true}>
            <div className="mb-8 rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={work.coverImage.src}
                alt={work.coverImage.alt || work.title}
                width={work.coverImage.width}
                height={work.coverImage.height}
                className="w-full h-auto"
              />
            </div>
          </AnimateOnScroll>
        )}

        {/* Body Content */}
        <AnimateOnScroll loadOnMount={true}>
          <div className="mb-12">
            {work.body ? (
              <MarkdownContent content={work.body} />
            ) : (
              <p className="text-muted-foreground">
                No content available for this work item.
              </p>
            )}
          </div>
        </AnimateOnScroll>

        {/* More work section */}
        {otherWorkItems.length > 0 && (
          <AnimateOnScroll loadOnMount={true}>
            <div className="mb-12">
              <h3 className="font-semibold mb-6">More work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherWorkItems.map((item) => (
                  <WorkCard key={item.slug} item={item} showFeatured />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        )}

        {/* Footer */}
        <AnimateOnScroll loadOnMount={true}>
          <Footer />
        </AnimateOnScroll>
      </div>

      <BottomNavigation />
    </div>
  );
}
