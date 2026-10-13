import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex justify-between items-center pt-8 text-sm text-muted-foreground">
      <span>© {new Date().getFullYear()} Will Green</span>
      <Link href="/about" className="hover:text-foreground underline">
        About
      </Link>
    </footer>
  )
}
