import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Download,
  Mail,
  ShoppingBag,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottom-navigation";
import Footer from "@/components/footer";
import AnimateOnScroll from "@/components/animate-on-scroll";
import WorkCard from "@/components/work-card";
import { getWorkItems } from "@/lib/work";

export default async function HomePage() {
  const workItems = await getWorkItems();

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Profile Section */}
        <AnimateOnScroll loadOnMount={true}>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200">
              <Image
                src="/profile-picture.jpg"
                alt="Will Green"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Will Green</h1>
              <p className="text-muted-foreground text-sm">Product Designer</p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Intro */}
        <AnimateOnScroll loadOnMount={true}>
          <div className="mb-8">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Will, a designer based in Bristol, UK. I'm currently
                at{" "}
                <Link
                  href="https://www.ravelin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline"
                >
                  Ravelin
                </Link>, making software to help companies detect and prevent fraud.
                I also make things at{" "}
                <Link
                  href="https://mostlywork.ing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline"
                >
                  mostlywork.ing
                </Link>{" "}
                and work part-time as a{" "}
                <Link
                  href="https://instagram.com/willgmoves"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:underline"
                >
                  personal trainer
                </Link>.
              </p>
              <p>
                I am occasionally available for freelance work, so feel free to
                get in touch below or schedule a call.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Action Buttons */}
        <AnimateOnScroll loadOnMount={true}>
          <div className="flex gap-3 mb-12">
            <Link href="/contact">
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                <Mail className="w-4 h-4 mr-2" />
                Get in touch
              </Button>
            </Link>
            <Link
              href="https://calendly.com/willgreen/15min?back=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Book a call
                <ArrowUpRight className="w-4 h-4 -ml-1 align-middle" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Elsewhere Section */}
        <AnimateOnScroll loadOnMount={true}>
          <section className="mb-16">
            <h3 className="font-semibold text-xl mb-4">Elsewhere</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.linkedin.com/in/williamanthonygreen/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight className="w-4 h-4 inline" />
              </Link>
              <Link
                href="https://instagram.com/willgpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Instagram <ArrowUpRight className="w-4 h-4 inline" />
              </Link>
              <Link
                href="https://dribbble.com/willgreen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Dribbble <ArrowUpRight className="w-4 h-4 inline" />
              </Link>
              <Link
                href="https://bsky.app/profile/willgreen.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Bluesky <ArrowUpRight className="w-4 h-4 inline" />
              </Link>
              <Link
                href="https://github.com/williamgreen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                GitHub <ArrowUpRight className="w-4 h-4 inline" />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCzduj27Ag0yKe6OZxqse2Ng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                YouTube <ArrowUpRight className="w-4 h-4 inline" />
              </Link>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Work Section */}
        <AnimateOnScroll loadOnMount={true}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl">Work</h3>
              <Link
                href="/work"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                All <ArrowRight className="w-4 h-4 inline" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {workItems.slice(0, 4).map((item) => (
                <WorkCard key={item.slug} item={item} showFeatured />
              ))}
            </div>

            <Link
              href="https://drive.google.com/file/d/1pAY4fx0UXpjMMePJ3yLQc644Kt2k5cmE/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="15 5 210 240"
                  className="w-4 h-4 mr-2 text-current"
                  focusable="false"
                >
                  <g>
                    <path d="M210.78,39.25l-130.25-23A16,16,0,0,0,62,29.23l-29.75,169a16,16,0,0,0,13,18.53l130.25,23h0a16,16,0,0,0,18.54-13l29.75-169A16,16,0,0,0,210.78,39.25ZM178.26,224h0L48,201,77.75,32,208,55ZM89.34,58.42a8,8,0,0,1,9.27-6.48l83,14.65a8,8,0,0,1-1.39,15.88,8.36,8.36,0,0,1-1.4-.12l-83-14.66A8,8,0,0,1,89.34,58.42ZM83.8,89.94a8,8,0,0,1,9.27-6.49l83,14.66A8,8,0,0,1,174.67,114a7.55,7.55,0,0,1-1.41-.13l-83-14.65A8,8,0,0,1,83.8,89.94Zm-5.55,31.51A8,8,0,0,1,87.52,115L129,122.29a8,8,0,0,1-1.38,15.88,8.27,8.27,0,0,1-1.4-.12l-41.5-7.33A8,8,0,0,1,78.25,121.45Z"></path>
                  </g>
                </svg>
                Read my CV
                <ArrowUpRight className="w-4 h-4 -ml-1 align-middle" />
              </Button>
            </Link>
          </section>
        </AnimateOnScroll>

        {/* Downloads Section */}
        <AnimateOnScroll loadOnMount={true}>
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl">Downloads</h3>
              <Link
                href="/downloads"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                All <ArrowRight className="w-4 h-4 inline" />
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="https://store.willgreen.co.uk/buy/3ef1d386-10f9-4f44-bf62-5f3267735e1d"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border shadow-sm hover:shadow-md hover:bg-muted/50 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/garmin-icons.png"
                      alt="Garmin Icons"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">Garmin Icons</h4>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground inline" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Alternative icons for the Garmin Connect app.
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                    Free
                  </span>
                </div>
              </Link>

              <Link
                href="https://store.willgreen.co.uk/buy/047e9f0c-3111-4f0f-9cd0-6bc284950c86"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center gap-4 p-4 rounded-lg border shadow-sm hover:shadow-md hover:bg-muted/50 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/fotmob-icons.png"
                      alt="FotMob Icons"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">FotMob Icons</h4>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground inline" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Alternative icons for the FotMob app.
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                    Free
                  </span>
                </div>
              </Link>
            </div>

            <Link
              href="https://store.willgreen.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="mt-6 bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="20 25 216 190"
                  className="w-4 h-4 mr-2 text-current"
                  focusable="false"
                >
                  <g>
                    <path
                      d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61Zm50,56h48v8a24,24,0,0,1-48,0Zm-16,0v8a24,24,0,0,1-48,0v-8ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8,.8Zm-8-72a24,24,0,0,1-24-24v-8h48v8A24,24,0,0,1,192,136Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                Web store
                <ArrowUpRight className="w-4 h-4 -ml-1 align-middle" />
              </Button>
            </Link>
          </section>
        </AnimateOnScroll>

        {/* Side-Project Graveyard Section */}
        <AnimateOnScroll loadOnMount={true}>
          <section className="mb-16">
            <h3 className="font-semibold text-xl mb-6">
              Side-Project Graveyard
            </h3>

            <div className="space-y-2">
              {[
                {
                  project: "Pixelwork",
                  period: "2023-25",
                  url: "https://average-drop-983720.framer.app/",
                },
                {
                  project: "Candid",
                  period: "2020-21",
                  url: "https://charming-palmier-eaa8bd.netlify.app/",
                },
                {
                  project: "Bloom",
                  period: "2017-19",
                  url: "https://incredible-conkies-7e81fc.netlify.app/",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex justify-between items-center py-1 hover:bg-muted/50 transition-colors rounded px-2 -mx-2">
                    <div className="flex items-center gap-1">
                      <span className="text-foreground">{item.project}</span>
                      <ArrowUpRight className="w-3 h-3 text-muted-foreground inline" />
                    </div>
                    <div className="flex-1 mx-4 border-b border-dotted border-muted-foreground/30"></div>
                    <span className="text-sm text-muted-foreground">
                      {item.period}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
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
