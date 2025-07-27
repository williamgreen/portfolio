import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Metadata } from "next"
import BottomNavigation from "@/components/bottom-navigation"
import Breadcrumb from "@/components/breadcrumb"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
          <p className="text-muted-foreground mb-6">
            Reach out with a message or schedule a call below.
          </p>
          
          {/* Availability Status */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            <span className="text-muted-foreground">Available for freelance work</span>
          </div>
          
          {/* Book a call button */}
          <Link href="https://calendly.com/willgreen/15min?back=1" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Book a call
            </Button>
          </Link>
        </div>

        {/* Contact Form - Formspark integration */}
        <form action="https://submit-form.com/qlcXz9id" method="POST" className="space-y-6 mb-6">
          {/* Name and Email row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="bg-muted border-0 placeholder:text-muted-foreground"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="bg-muted border-0 placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Message field */}
          <Textarea
            name="message"
            placeholder="Message"
            required
            rows={8}
            className="bg-muted border-0 placeholder:text-muted-foreground resize-none"
          />
          
          {/* Send button */}
          <Button type="submit" className="w-full bg-foreground text-background hover:bg-foreground/90">
            Send
          </Button>
        </form>

        {/* Response time */}
        <div className="flex items-center gap-2 mb-12 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Avg. response 12 hours</span>
        </div>

        {/* Footer */}
        <Footer />
      </div>
      <BottomNavigation />
    </div>
  )
}
