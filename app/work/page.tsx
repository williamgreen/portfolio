import { Metadata } from "next";
import BottomNavigation from "@/components/bottom-navigation";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import AnimateOnScroll from "@/components/animate-on-scroll";
import WorkCard from "@/components/work-card";
import { getWorkItems } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
};

export default async function WorkPage() {
  const workItems = await getWorkItems();

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <AnimateOnScroll loadOnMount={true}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Work" }]}
          />
        </AnimateOnScroll>

        {/* Header */}
        <AnimateOnScroll loadOnMount={true}>
          <div className="mb-12">
            <h1 className="text-4xl font-bold">A few bits of my work</h1>
          </div>
        </AnimateOnScroll>

        {/* Work Grid */}
        <AnimateOnScroll loadOnMount={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
            {workItems.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </AnimateOnScroll>

        {/* Footer */}
        <AnimateOnScroll loadOnMount={true}>
          <Footer />
        </AnimateOnScroll>
      </div>

      <BottomNavigation />
    </div>
  );
}
