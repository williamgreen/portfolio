import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const WORK_DIR = path.join(process.cwd(), "content/work")

export interface WorkCoverImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface WorkItem {
  slug: string
  title: string
  subtitle: string
  company: string
  year: string
  websiteLink?: string
  externalLink?: string
  featured?: boolean
  order?: number
  wide?: boolean
  coverImage?: WorkCoverImage
  coverVideo?: string[]
  coverPoster?: string
  coverBleed?: boolean
  body: string
}

type WorkFrontmatter = {
  title: string
  subtitle?: string
  company: string
  year: string | number
  website?: string
  link?: string
  featured?: boolean
  order?: number
  wide?: boolean
  cover?: string
  coverVideo?: string | string[]
  coverPoster?: string
  coverBleed?: boolean
  coverAlt?: string
}

function getPngSize(filePath: string): { width: number; height: number } {
  const buffer = fs.readFileSync(filePath)
  const isPng =
    buffer.length >= 24 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47

  if (isPng) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    }
  }

  return { width: 1096, height: 1096 }
}

function resolveCover(cover: string | undefined, coverAlt: string | undefined, title: string): WorkCoverImage | undefined {
  if (!cover) return undefined

  const publicPath = path.join(process.cwd(), "public", cover.replace(/^\//, ""))
  const size = fs.existsSync(publicPath) ? getPngSize(publicPath) : { width: 1096, height: 1096 }

  return {
    src: cover,
    alt: coverAlt || title,
    width: size.width,
    height: size.height,
  }
}

function parseWorkFile(filename: string): WorkItem {
  const slug = filename.replace(/\.md$/, "")
  const raw = fs.readFileSync(path.join(WORK_DIR, filename), "utf8")
  const { data, content } = matter(raw)
  const frontmatter = data as WorkFrontmatter

  return {
    slug,
    title: frontmatter.title,
    subtitle: frontmatter.subtitle || "",
    company: frontmatter.company,
    year: String(frontmatter.year),
    websiteLink: frontmatter.website,
    externalLink: frontmatter.link,
    featured: Boolean(frontmatter.featured),
    order: typeof frontmatter.order === "number" ? frontmatter.order : undefined,
    wide: Boolean(frontmatter.wide),
    coverImage: resolveCover(frontmatter.cover, frontmatter.coverAlt, frontmatter.title),
    coverVideo: frontmatter.coverVideo ? [frontmatter.coverVideo].flat() : undefined,
    coverPoster: frontmatter.coverPoster,
    coverBleed: Boolean(frontmatter.coverBleed),
    body: content.trim(),
  }
}

function sortWorkItems(items: WorkItem[]): WorkItem[] {
  return [...items].sort((a, b) => {
    const yearA = Number.parseInt(String(a.year), 10) || 0
    const yearB = Number.parseInt(String(b.year), 10) || 0
    if (yearA !== yearB) return yearB - yearA
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER
    if (orderA !== orderB) return orderA - orderB
    return a.title.localeCompare(b.title)
  })
}

export async function getWorkItems(): Promise<WorkItem[]> {
  if (!fs.existsSync(WORK_DIR)) return []

  const files = fs.readdirSync(WORK_DIR).filter((file) => file.endsWith(".md"))
  return sortWorkItems(files.map(parseWorkFile))
}

export async function getWorkItem(slug: string): Promise<WorkItem | null> {
  const filename = `${slug}.md`
  const filePath = path.join(WORK_DIR, filename)
  if (!fs.existsSync(filePath)) return null
  const item = parseWorkFile(filename)
  // External items link straight out from their card and have no work page
  return item.externalLink ? null : item
}
