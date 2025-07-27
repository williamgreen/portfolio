import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Metadata } from "next"
import BottomNavigation from "@/components/bottom-navigation"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: 'Downloads',
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Downloads" }]} />
        
        <h1 className="text-4xl font-bold mb-8">Some things I've made</h1>

        {/* Downloads List */}
        <div className="flex flex-col gap-4 mb-6">
          <Link
            href="https://store.willgreen.co.uk/buy/3ef1d386-10f9-4f44-bf62-5f3267735e1d"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
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
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Alternative icons for the Garmin Connect app.</p>
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
            <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
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
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Alternative icons for the FotMob mobile app.</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                Free
              </span>
            </div>
          </Link>

          <Link
            href="https://store.willgreen.co.uk/buy/239b697b-6699-45c0-8f5d-a3ad14cc15ea"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/voyager-icons.png"
                  alt="Voyager Icons"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">Voyager Icons</h4>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Alternative icons for the Lemmy client, Voyager.</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                Free
              </span>
            </div>
          </Link>
        </div>

        {/* Web Store Button */}
        <Link href="https://store.willgreen.co.uk/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="mb-12 bg-transparent">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 25 216 190" className="w-4 h-4 mr-2 text-current" focusable="false">
              <g>
                <path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61Zm50,56h48v8a24,24,0,0,1-48,0Zm-16,0v8a24,24,0,0,1-48,0v-8ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm-8-72a24,24,0,0,1-24-24v-8h48v8A24,24,0,0,1,192,136Z" fill="currentColor"></path>
              </g>
            </svg>
            Web store
          </Button>
        </Link>

        {/* Footer */}
        <Footer />
      </div>
      <BottomNavigation />
    </div>
  )
}
