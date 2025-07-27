"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, Download, Mail } from "lucide-react"
import { useEffect, useState } from "react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/work", icon: Briefcase, label: "Work" },
  { href: "/downloads", icon: Download, label: "Downloads" },
  { href: "/contact", icon: Mail, label: "Contact" },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background/80 backdrop-blur-md border rounded-full px-2 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all group text-muted-foreground hover:text-foreground hover:bg-muted/50"
                >
                  <Icon className="w-5 h-5" />
                  <div className="absolute bottom-full mb-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {item.label}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-background/80 backdrop-blur-md border rounded-full px-2 py-2 shadow-lg">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all group ${
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="absolute bottom-full mb-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
