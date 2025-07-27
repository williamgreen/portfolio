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

export async function getWorkItems(): Promise<WorkItem[]> {
  try {
    console.log("Fetching work items using direct API...")

    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=workItem&access_token=${ACCESS_TOKEN}&order=-fields.year&include=2`,
    )

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response:", data)
    console.log("Number of items found:", data.items?.length || 0)

    if (!data.items || data.items.length === 0) {
      console.log("No items found")
      return []
    }

    // Create a map of assets for easy lookup
    const assets = {}
    if (data.includes?.Asset) {
      data.includes.Asset.forEach((asset: any) => {
        assets[asset.sys.id] = asset
      })
    }

    return data.items.map((item: any) => {
      console.log("Processing item:", item.fields)

      // Handle cover image reference
      let coverImage = null
      if (item.fields.coverImage && item.fields.coverImage.sys) {
        const assetId = item.fields.coverImage.sys.id
        const asset = assets[assetId]
        if (asset) {
          coverImage = {
            fields: {
              file: asset.fields.file,
              title: asset.fields.title || "",
            },
          }
        }
      }

      return {
        title: item.fields.title || "",
        subtitle: item.fields.subtitle || "",
        company: item.fields.company || "",
        year: item.fields.year || "",
        websiteLink: item.fields.websiteLink || "",
        coverImage: coverImage,
        bodyContent: item.fields.bodyContent || null,
        slug: item.fields.slug || "",
        featured: item.fields.featured || false,
      }
    })
  } catch (error) {
    console.error("Error fetching work items:", error)
    return []
  }
}

export async function getWorkItem(slug: string): Promise<WorkItem | null> {
  try {
    console.log("Fetching work item:", slug)

    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=workItem&fields.slug=${slug}&access_token=${ACCESS_TOKEN}&limit=1&include=2`,
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Single item API response:", data)

    if (!data.items || data.items.length === 0) {
      return null
    }

    // Create a map of assets for easy lookup
    const assets = {}
    if (data.includes?.Asset) {
      data.includes.Asset.forEach((asset: any) => {
        assets[asset.sys.id] = asset
      })
    }

    const item = data.items[0]

    // Handle cover image reference
    let coverImage = null
    if (item.fields.coverImage && item.fields.coverImage.sys) {
      const assetId = item.fields.coverImage.sys.id
      const asset = assets[assetId]
      if (asset) {
        coverImage = {
          fields: {
            file: asset.fields.file,
            title: asset.fields.title || "",
          },
        }
      }
    }

    return {
      title: item.fields.title || "",
      subtitle: item.fields.subtitle || "",
      company: item.fields.company || "",
      year: item.fields.year || "",
      websiteLink: item.fields.websiteLink || "",
      coverImage: coverImage,
      bodyContent: item.fields.bodyContent || null,
      slug: item.fields.slug || "",
      featured: item.fields.featured || false,
    }
  } catch (error) {
    console.error("Error fetching work item:", error)
    return null
  }
}
