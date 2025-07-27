const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error('Missing Contentful environment variables. Please check your .env.local file.')
}

export interface WorkItem {
  title: string
  subtitle: string
  company: string
  year: string
  websiteLink?: string
  coverImage: {
    fields: {
      file: {
        url: string
        details: {
          image: {
            width: number
            height: number
          }
        }
      }
      title: string
    }
  }
  bodyContent: any
  slug: string
  featured?: boolean
}

export async function getWorkItemsFetch(): Promise<WorkItem[]> {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=workItem&access_token=${ACCESS_TOKEN}&order=-fields.year`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Fetch API response:", data)

    return data.items.map((item: any) => ({
      title: item.fields.title,
      subtitle: item.fields.subtitle,
      company: item.fields.company,
      year: item.fields.year,
      websiteLink: item.fields.websiteLink,
      coverImage: item.fields.coverImage,
      bodyContent: item.fields.bodyContent,
      slug: item.fields.slug,
      featured: item.fields.featured,
    }))
  } catch (error) {
    console.error("Fetch API error:", error)
    return []
  }
}

export async function getWorkItemFetch(slug: string): Promise<WorkItem | null> {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=workItem&fields.slug=${slug}&access_token=${ACCESS_TOKEN}&limit=1`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.items.length === 0) {
      return null
    }

    const item = data.items[0]
    return {
      title: item.fields.title,
      subtitle: item.fields.subtitle,
      company: item.fields.company,
      year: item.fields.year,
      websiteLink: item.fields.websiteLink,
      coverImage: item.fields.coverImage,
      bodyContent: item.fields.bodyContent,
      slug: item.fields.slug,
      featured: item.fields.featured,
    }
  } catch (error) {
    console.error("Fetch API error:", error)
    return null
  }
}
