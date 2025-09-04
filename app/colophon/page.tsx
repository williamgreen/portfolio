import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import BottomNavigation from "@/components/bottom-navigation";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import AnimateOnScroll from "@/components/animate-on-scroll";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Colophon",
};

export default function ColophonPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12 min-h-[calc(100vh-6rem)] flex flex-col">
        <AnimateOnScroll loadOnMount={true}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Colophon" }]}
          />
        </AnimateOnScroll>

        {/* Vertically centered content */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimateOnScroll loadOnMount={true}>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Colophon</h1>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>This website is designed and developed by me, Will Green.</p>

                <p>
                  It is built using{" "}
                  <Link
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    Next.js
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    Tailwind
                  </Link>
                  . I had some help from{" "}
                  <Link
                    href="https://v0.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    v0
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://cursor.com/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    Cursor
                  </Link>
                  . The design is based on an old Framer template called Console
                  by{" "}
                  <Link
                    href="https://rejiggle.framer.website/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    Reijggle
                  </Link>
                  . Any assets used are designed in{" "}
                  <Link
                    href="https://figma.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    Figma
                  </Link>
                  . The font used is{" "}
                  <Link
                    href="https://rsms.me/inter/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    Inter
                  </Link>{" "}
                  by{" "}
                  <Link
                    href="https://rsms.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    Rasmus Andersson
                  </Link>
                  .
                </p>

                <p>The content on this website is copyrighted.</p>
              </div>

              <Link href="/">
                <Button variant="outline" className="mt-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Footer */}
        <AnimateOnScroll loadOnMount={true}>
          <Footer />
        </AnimateOnScroll>
      </div>
      <BottomNavigation />
    </div>
  );
}
